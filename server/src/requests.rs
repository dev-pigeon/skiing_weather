use serde::{Serialize, Deserialize};


#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct TourRequest {
    boundary_x: f32,
    boundary_y: f32
}

impl TourRequest {
    pub fn new(boundary_x: f32, boundary_y: f32) -> Self {
        TourRequest {
            boundary_x,
            boundary_y
        }
    }
}