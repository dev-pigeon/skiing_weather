mod WrappedF32;
mod indexer;
mod parser;
mod requests;

use anyhow::Result;
use axum::{
    routing::{get, post},
    Json, Router,
};
use lazy_static::lazy_static;
use requests::{TourRequest, TourResponse};
use std::env;
use tokio::net::TcpListener;

lazy_static! {
    static ref INDEXER: indexer::Indexer = {
        let parser = parser::Parser::from_path("../data/resorts.json").unwrap();
        indexer::Indexer::from(parser)
    };
}

#[tokio::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();

    /*
    Create the routes, each route needs a handler function.
     */
    let app = create_router();

    // Get the server address from the environment variables
    let server_address = match env::var("DEV")?.as_str() {
        "TRUE" => env::var("SERVER_ADDRESS_DEV")?,
        _ => env::var("SERVER_ADDRESS")?,
    };

    // Create the server
    let listener = TcpListener::bind(server_address).await?;

    //Serve
    axum::serve(listener, app).await?;

    Ok(())
}

fn create_router() -> Router {
    Router::new()
        .route("/", get(root))
        .route("/tour", post(tour))
}

async fn root() -> &'static str {
    "Hello, World!"
}

async fn tour(Json(payload): Json<TourRequest>) -> Json<TourResponse> {
    let found = INDEXER.find_in_bounds(
        payload.top_left.0,
        payload.top_left.1,
        payload.bottom_right.0,
        payload.bottom_right.1,
    );

    let response = TourResponse::from(found);

    Json(response)
}

#[cfg(test)]
mod test {
    use super::*;
    use axum::body::Body;
    use axum::http::Request;
    use tower::ServiceExt;

    #[tokio::test]
    async fn test_root() {
        let app = create_router();

        let response = app.oneshot(Request::new(Body::empty())).await.unwrap();

        let bytes = axum::body::to_bytes(response.into_body(), usize::MAX)
            .await
            .unwrap();
        let body = String::from_utf8(bytes.to_vec()).unwrap();

        assert_eq!(body, "Hello, World!");
    }

    #[tokio::test]
    async fn test_tour() {
        let app = create_router();

        let test_tour = TourRequest::new((10.0, 15.0), (10.0, 15.0));

        let request = Request::builder()
            .uri("/tour")
            .method("POST")
            .header("content-type", "application/json")
            .body(Body::from(serde_json::to_string(&test_tour).unwrap()))
            .unwrap();

        let response = app.oneshot(request).await.unwrap();

        let bytes = axum::body::to_bytes(response.into_body(), usize::MAX)
            .await
            .unwrap();

        let response_tour: TourResponse = serde_json::from_slice(&bytes).unwrap();

        assert_eq!(response_tour.length, 0);
    }

    #[tokio::test]
    async fn test_find_beavercreek_exact() {
        let lat = 39.6048786;
        let lon = -106.5150017;

        let delta = 0.0001;
        let resorts = INDEXER.find_in_bounds(
            lon - delta, // min_lon
            lat - delta, // min_lat
            lon + delta, // max_lon
            lat + delta, // max_lat
        );

        assert_eq!(resorts.len(), 1, "Should find exactly one resort");
        assert_eq!(resorts[0].Resort, "Beaver Creek");
    }

    #[tokio::test]
    async fn find_all_in_colorado() {
        let resorts = INDEXER.find_in_bounds(
            -109.051, // min_lon
            36.993,   // min_lat
            -102.041, // max_lon
            41.003,   // max_lat
        );

        assert_eq!(resorts.len(), 12);
    }
}
