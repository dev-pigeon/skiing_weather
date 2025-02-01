use std::env;
use axum::{
    routing::get,
     Router,
};
use anyhow::Result;

#[tokio::main]
async fn main() -> Result<()> {
    dotenv::dotenv()?;

    /*
    Create the routes, each route needs a handler function.
     */
    let app = Router::new()
        .route("/", get(root));

    // Get the server address from the environment variables
    let server_address = match env::var("DEV")?.as_str() {
        "TRUE" => env::var("SERVER_ADDRESS_DEV")?,
        _ => env::var("SERVER_ADDRESS")?,
    };

    // Create the server
    let listener = tokio::net::TcpListener::bind(server_address).await?;

    //Serve
    axum::serve(listener, app).await?;

    Ok(())
}

async fn root() -> &'static str {
    "Hello, World!"
}
