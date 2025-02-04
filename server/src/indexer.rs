use crate::parser::{Parser, Resort};
use std::collections::HashMap;
use crate::WrappedF32::WrappedF32;

/// Indexer mapping a coordinate pair (longitude, latitude) to a Resort.
pub struct Indexer {
    map: HashMap<(WrappedF32, WrappedF32), Resort>,
}

impl Indexer {
    /// Find all resorts within the given bounding box.
    /// `min_lon`, `min_lat`: bottom left corner;
    /// `max_lon`, `max_lat`: top right corner.
    #[inline(always)]
    pub fn find_in_bounds(
        &self,
        min_lon: f32,
        min_lat: f32,
        max_lon: f32,
        max_lat: f32,
    ) -> Vec<&Resort> {
        self.map
            .iter()
            .filter(|((lon, lat), _)| {
                // Directly use the inner f32 values for fast comparison.
                Self::is_within_bounds(lon.0, lat.0, min_lon, min_lat, max_lon, max_lat)
            })
            .map(|(_, resort)| resort)
            .collect()
    }

    /// Check if the given coordinates are within the bounding box.
    #[inline(always)]
    fn is_within_bounds(
        lon: f32,
        lat: f32,
        min_lon: f32,
        min_lat: f32,
        max_lon: f32,
        max_lat: f32,
    ) -> bool {
        lon >= min_lon && lon <= max_lon && lat >= min_lat && lat <= max_lat
    }

    /// Get all resorts stored in the index.
    #[inline(always)]
    pub fn get_all_resorts(&self) -> Vec<&Resort> {
        self.map.values().collect()
    }
}

impl From<Parser> for Indexer {
    fn from(parser: Parser) -> Self {
        let mut map = HashMap::new();
        for resort in parser.resorts {
            // Parse coordinate strings into f32 and wrap them.
            let lon = WrappedF32::from(resort.coordinates[0].parse::<f32>().unwrap());
            let lat = WrappedF32::from(resort.coordinates[1].parse::<f32>().unwrap());
            // Directly insert the resort (1-1 mapping).
            map.insert((lon, lat), resort);
        }
        Indexer { map }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::parser::Resort;

    fn create_test_resort(lon: f32, lat: f32) -> Resort {
        let mut res = Resort::default();
        res.coordinates = vec![lon.to_string(), lat.to_string()];
        res
    }

    #[test]
    fn test_find_in_bounds() {
        let mut map: HashMap<(WrappedF32, WrappedF32), Resort> = HashMap::new();

        // Create test resorts.
        let resort1 = create_test_resort(10.0, 45.0);
        let resort2 = create_test_resort(11.0, 46.0);
        let resort3 = create_test_resort(15.0, 50.0);

        map.insert((WrappedF32(10.0), WrappedF32(45.0)), resort1);
        map.insert((WrappedF32(11.0), WrappedF32(46.0)), resort2);
        map.insert((WrappedF32(15.0), WrappedF32(50.0)), resort3);

        let indexer = Indexer { map };

        // Find resorts within a bounding box that should capture the first two.
        let results = indexer.find_in_bounds(9.0, 44.0, 12.0, 47.0);
        assert_eq!(results.len(), 2);

        // Test with a box that returns no resorts.
        let no_results = indexer.find_in_bounds(0.0, 0.0, 1.0, 1.0);
        assert_eq!(no_results.len(), 0);
    }

    #[test]
    fn test_is_within_bounds() {
        assert!(Indexer::is_within_bounds(10.0, 45.0, 9.0, 44.0, 11.0, 46.0));
        assert!(!Indexer::is_within_bounds(12.0, 47.0, 9.0, 44.0, 11.0, 46.0));
    }
}
