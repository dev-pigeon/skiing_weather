use crate::parser::{Parser, Resort};
use crate::WrappedF32::WrappedF32;
use rstar::{Point, RTree, RTreeObject, AABB};
use std::collections::HashMap;

#[derive(Copy, Clone, Debug, PartialEq)]
pub struct Coordinate {
    pub lon: f32,
    pub lat: f32,
}

pub struct Indexer {
    tree: RTree<Resort>,
}

impl Indexer {
    pub fn find_in_bounds(
        &self,
        min_lon: f32,
        min_lat: f32,
        max_lon: f32,
        max_lat: f32,
    ) -> Vec<Resort> {
        let envelope = AABB::from_corners(
            Coordinate {
                lon: min_lon,
                lat: min_lat,
            },
            Coordinate {
                lon: max_lon,
                lat: max_lat,
            },
        );
        self.tree.locate_in_envelope(&envelope).cloned().collect()
    }
}

impl From<Parser> for Indexer {
    fn from(parser: Parser) -> Self {
        let tree = RTree::bulk_load(parser.resorts);
        Indexer { tree }
    }
}

impl Point for Coordinate {
    type Scalar = f32;
    const DIMENSIONS: usize = 2;

    fn generate(mut generator: impl FnMut(usize) -> Self::Scalar) -> Self {
        Coordinate {
            lon: generator(0),
            lat: generator(1),
        }
    }

    fn nth(&self, index: usize) -> Self::Scalar {
        match index {
            0 => self.lon,
            1 => self.lat,
            _ => unreachable!(),
        }
    }

    fn nth_mut(&mut self, index: usize) -> &mut Self::Scalar {
        match index {
            0 => &mut self.lon,
            1 => &mut self.lat,
            _ => unreachable!(),
        }
    }
}

impl RTreeObject for Resort {
    type Envelope = AABB<Coordinate>;

    fn envelope(&self) -> Self::Envelope {
        let lon: f32 = self.coordinates[0].parse().unwrap();
        let lat: f32 = self.coordinates[1].parse().unwrap();
        let point = Coordinate { lon, lat };
        AABB::from_point(point)
    }
}
