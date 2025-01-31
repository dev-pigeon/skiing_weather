import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";

interface WeatherData {
  currentWeather: Current;
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

    const newData: WeatherData = {
      currentWeather: currentWeatherData,
    };

    setWeatherData(newData);
  };

  return {
    requestWeatherData,
    weatherData,
  };
};

export default WeatherCardHook;
