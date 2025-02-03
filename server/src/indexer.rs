use crate::parser::{Parser, Resort};
use std::collections::HashMap;

pub struct Indexer {
    map: HashMap<(f32, f32), Vec<Resort>>,
}

impl Indexer {
    /// Find all resorts within the given bounding box
    /// min_lon, min_lat: bottom left corner
    /// max_lon, max_lat: top right corner
    pub fn find_in_bounds(&self, min_lon: f32, min_lat: f32, max_lon: f32, max_lat: f32) -> Vec<&Resort> {
        self.map
            .iter()
            .filter(|((lon, lat), _)| {
                Self::is_within_bounds(*lon, *lat, min_lon, min_lat, max_lon, max_lat)
            })
            .flat_map(|(_, resorts)| resorts)
            .collect()
    }

    /// Check if coordinates are within the bounding box
    fn is_within_bounds(lon: f32, lat: f32, min_lon: f32, min_lat: f32, max_lon: f32, max_lat: f32) -> bool {
        lon >= min_lon && lon <= max_lon && lat >= min_lat && lat <= max_lat
    }

    /// Get all resorts in the index
    pub fn get_all_resorts(&self) -> Vec<&Resort> {
        self.map
            .values()
            .flat_map(|resorts| resorts)
            .collect()
    }
}

impl From<Parser> for Indexer {
    fn from(parser: Parser) -> Self {
        let mut map = HashMap::new();
        for resort in parser.resorts {
            let key = (resort.coordinates[0].parse().unwrap(), resort.coordinates[1].parse().unwrap());
            let entry = map.entry(key).or_insert(Vec::new());
            entry.push(resort);
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
        let mut map = HashMap::new();
        
        // Add some test resorts
        let resort1 = create_test_resort(10.0, 45.0);
        let resort2 = create_test_resort(11.0, 46.0);
        let resort3 = create_test_resort(15.0, 50.0);

        map.insert((10.0, 45.0), vec![resort1]);
        map.insert((11.0, 46.0), vec![resort2]);
        map.insert((15.0, 50.0), vec![resort3]);

        let indexer = Indexer { map };

        // Test finding resorts within bounds
        let results = indexer.find_in_bounds(9.0, 44.0, 12.0, 47.0);
        assert_eq!(results.len(), 2);

        // Test empty results
        let no_results = indexer.find_in_bounds(0.0, 0.0, 1.0, 1.0);
        assert_eq!(no_results.len(), 0);
    }

    #[test]
    fn test_is_within_bounds() {
        assert!(Indexer::is_within_bounds(10.0, 45.0, 9.0, 44.0, 11.0, 46.0));
        assert!(!Indexer::is_within_bounds(12.0, 47.0, 9.0, 44.0, 11.0, 46.0));
    }
}