import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";

interface WeatherData {
  currentWeather: Current;
  dailyWeather: Daily;
  hourlyWeather: Hourly;
}

interface Current {
  temperature: number;
  relative_humidity: number;
  is_day: number;
  precipitaion: number;
  rain: number;
  showers: number;
  snowfall: number;
  cloud_cover: number;
  wind_speed_10m: number;
}

interface Daily {
  min_temp: number[];
  max_temp: number[];
  min_feel_temp: number[];
  max_feel_temp: number[];
  showers_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
}

interface Hourly {
  temp: number[];
  precipitation_probability: number[];
  precipitation: number[];
  snowfall: number[];
  snow_depth: number[];
  cloud_cover: number[]; //percent
  visibility: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
}

interface Day {
  date: string;
  dateDescriptor:
    | "Today"
    | "Tomorrow"
    | "Monday"
    | "Tuesday"
    | "Wedneday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  cloud_cover: "Clear Sky" | "Partly Cloudly" | "Overcast";
  max_temp: number;
  min_temp: number;
  sunny: boolean;
  rainy: boolean;
  snowy: boolean;
  foggy: boolean;
  windy: boolean;
}

interface Hour {
  time: string;
  condition: "Clear Sky" | "Parly Sunny" | "Parly Cloudy" | "Overcast";
  sunny: boolean;
  rainy: boolean;
  snowy: boolean;
  foggy: boolean;
  windy: boolean;
}

const WeatherCardHook = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const url = "https://api.open-meteo.com/v1/forecast";

  const requestWeatherData = async (lat: number, lon: number) => {
    const params = {
      latitude: lat,
      longitude: lon,
      current: [
        "temperature_2m",
        "is_day",
        "precipitation",
        "rain",
        "showers",
        "snowfall",
        "cloud_cover",
        "wind_speed_10m",
      ],
      hourly: [
        "temperature_2m",
        "precipitation_probability",
        "precipitation",
        "snowfall",
        "snow_depth",
        "cloud_cover",
        "visibility",
        "wind_speed_10m",
        "wind_gusts_10m",
      ],
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min",
        "showers_sum",
        "precipitation_probability_max",
        "wind_speed_10m_max",
        "wind_gusts_10m_max",
      ],
      temperature_unit: "fahrenheit",
      timezone: "auto",
    };

    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const currentWeatherData: Current = {
      temperature: response.current()!.variables(0)!.value(),
      relative_humidity: response.current()!.variables(1)!.value(),
      is_day: response.current()!.variables(2)!.value(),
      precipitaion: response.current()!.variables(3)!.value(),
      rain: response.current()!.variables(4)!.value(),
      showers: response.current()!.variables(5)!.value(),
      snowfall: response.current()!.variables(6)!.value(),
      cloud_cover: response.current()!.variables(7)!.value(),
      wind_speed_10m: response.current()!.variables(8)!.value(),
    };

    const dailyWeather: Daily = {
      min_temp: Array.from(response.daily()!.variables(0)?.valuesArray()!),
      max_temp: Array.from(response.daily()!.variables(1)?.valuesArray()!),
      min_feel_temp: Array.from(response.daily()!.variables(2)?.valuesArray()!),
      max_feel_temp: Array.from(response.daily()!.variables(3)?.valuesArray()!),
      showers_sum: Array.from(response.daily()!.variables(4)?.valuesArray()!),
      precipitation_probability_max: Array.from(
        response.daily()!.variables(5)?.valuesArray()!
      ),
      wind_speed_10m_max: Array.from(
        response.daily()!.variables(6)?.valuesArray()!
      ),
      wind_gusts_10m_max: Array.from(
        response.daily()!.variables(7)?.valuesArray()!
      ),
    };

    const hourlyWeather: Hourly = {
      temp: Array.from(response.hourly()!.variables(0)?.valuesArray()!),
      precipitation_probability: Array.from(
        response.hourly()!.variables(1)?.valuesArray()!
      ),
      precipitation: Array.from(
        response.hourly()!.variables(2)?.valuesArray()!
      ),
      snowfall: Array.from(response.hourly()!.variables(3)?.valuesArray()!),
      snow_depth: Array.from(response.hourly()!.variables(4)?.valuesArray()!),
      cloud_cover: Array.from(response.hourly()!.variables(5)?.valuesArray()!),
      visibility: Array.from(response.hourly()!.variables(6)?.valuesArray()!),
      wind_speed_10m: Array.from(
        response.hourly()!.variables(7)?.valuesArray()!
      ),
      wind_gusts_10m: Array.from(
        response.hourly()!.variables(8)?.valuesArray()!
      ),
    };

    const newData: WeatherData = {
      currentWeather: currentWeatherData,
      dailyWeather: dailyWeather,
      hourlyWeather: hourlyWeather,
    };

    setWeatherData(newData);
  };

  return {
    requestWeatherData,
    weatherData,
  };
};

export default WeatherCardHook;
