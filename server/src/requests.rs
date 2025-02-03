use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct TourRequest {
    boundary_x: f32,
    boundary_y: f32,
}

impl TourRequest {
    pub fn new(boundary_x: f32, boundary_y: f32) -> Self {
        TourRequest {
            boundary_x,
            boundary_y,
        }
    }
}

#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct TourResponse {
    success: bool,
}

impl TourResponse {
    pub fn new(success: bool) -> Self {
        TourResponse { success }
    }
}
