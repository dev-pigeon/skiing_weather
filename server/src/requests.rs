use std::ops::Sub;

use crate::parser::Resort;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct TourRequest {
    pub top_left: (f32, f32),
    pub bottom_right: (f32, f32),
}

impl TourRequest {
    pub fn new(top_left: (f32, f32), bottom_right: (f32, f32)) -> Self {
        TourRequest {
            top_left,
            bottom_right,
        }
    }
}

#[derive(Deserialize, Serialize, PartialEq, Debug)]
pub struct TourResponse {
    found: Vec<Resort>,
    success: bool,
    pub length: usize,
}

impl From<Vec<Resort>> for TourResponse {
    fn from(found: Vec<Resort>) -> Self {
        let len = found.len();
        TourResponse {
            found: found,
            success: true,
            length: len,
        }
    }
}
