mod requests;

use anyhow::Result;
use axum::{
    routing::{get, post},
    Json, Router,
};
use requests::TourRequest;
use std::env;
use tokio::net::TcpListener;

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

async fn tour(Json(payload): Json<TourRequest>) -> Json<TourRequest> {
    //Just reflects the request for now
    Json(payload)
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

        let test_tour = TourRequest::new(10.0, 10.0);

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
        let response_tour: TourRequest = serde_json::from_slice(&bytes).unwrap();

        assert_eq!(response_tour, test_tour);
    }
}
