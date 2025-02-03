use anyhow::{anyhow, Result};
use serde::Deserialize;
use serde_json;
use std::path::Path;

pub struct Parser {
    pub resorts: Vec<Resort>,
}

#[allow(non_snake_case, dead_code)]
#[derive(Deserialize, Debug, Default)]
pub struct Resort {
    ID: String,
    Resort: String,
    Country: String,
    Continent: String,
    Price: String,
    Season: String,
    #[serde(rename = "Highest point")]
    Highest_point: String,
    #[serde(rename = "Lowest point")]
    Lowest_point: String,
    #[serde(rename = "Beginner slopes")]
    Beginner_slopes: String,
    #[serde(rename = "Intermediate slopes")]
    Intermediate_slopes: String,
    #[serde(rename = "Difficult slopes")]
    Difficult_slopes: String,
    #[serde(rename = "Total slopes")]
    Total_slopes: String,
    #[serde(rename = "Longest run")]
    Longest_run: String,
    #[serde(rename = "Snow cannons")]
    Snow_cannons: String,
    #[serde(rename = "Surface lifts")]
    Surface_lifts: String,
    #[serde(rename = "Chair lifts")]
    Chair_lifts: String,
    #[serde(rename = "Gondola lifts")]
    Gondola_lifts: String,
    #[serde(rename = "Total lifts")]
    Total_lifts: String,
    #[serde(rename = "Lift capacity")]
    Lift_capacity: String,
    #[serde(rename = "Child friendly")]
    Child_friendly: String,
    Snowparks: String,
    Nightskiing: String,
    #[serde(rename = "Summer skiing")]
    Summer_skiing: String,
    pub coordinates: Vec<String>,
}

impl Parser {
    pub fn new() -> Self {
        Parser {
            resorts: Vec::new(),
        }
    }

    pub fn from_path(path: &str) -> Result<Self> {
        Ok(Self {
            resorts: Resort::from_path(path)?,
        })
    }
}

impl Resort {
    fn from_path(path: &str) -> Result<Vec<Self>> {
        let path = Path::new(path);
        let file = std::fs::File::open(path)?;
        let resorts: Vec<Resort> =
            serde_json::from_reader(file).map_err(|e| anyhow!("Failed to parse JSON: {}", e))?;
        Ok(resorts)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_resort_from_path() {
        let resorts = Resort::from_path("../data/resorts.json").unwrap();
        assert_eq!(resorts.len(), 499);
    }

    #[test]
    fn test_parser_from_path() {
        let parser = Parser::from_path("../data/resorts.json").unwrap();
        assert_eq!(parser.resorts.len(), 499);
    }
}
