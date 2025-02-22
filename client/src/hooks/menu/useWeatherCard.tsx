import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import {
  DailyWeatherAPIResponse,
  HourlyWeatherAPIResponse,
  Now,
  NowWeatherAPIResponse,
} from "./WeatherInterfaces";
import { parseCurrentWeather } from "./WeatherParser";

interface WeatherData {
  dailyWeather: DailyWeatherAPIResponse;
  hourlyWeather: HourlyWeatherAPIResponse;
  currentWeather: NowWeatherAPIResponse;
  now: Now;
}

export interface useWeatherCard {
  requestWeatherData: (lat: number, lon: number) => void;
  weatherData: WeatherData | undefined;
}

const WeatherCardHook = (): useWeatherCard => {
  const [weatherData, setWeatherData] = useState<WeatherData | undefined>();
  const url = "https://api.open-meteo.com/v1/forecast";

  const requestWeatherData = async (lat: number, lon: number) => {
    const params = {
      latitude: lat,
      longitude: lon,
      current: [
        "rain",
        "temperature_2m",
        "sunshine_duration",
        "wind_speed_10m",
        "snowfall",
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
        "rain",
        "showers",
        "is_day", // used for current time
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

    const dailyWeather: DailyWeatherAPIResponse = {
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

    const hourlyWeather: HourlyWeatherAPIResponse = {
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
      rain: Array.from(response.hourly()!.variables(9)?.valuesArray()!),
      showers: Array.from(response.hourly()!.variables(10)?.valuesArray()!),
      is_day: Array.from(response.hourly()!.variables(11)?.valuesArray()!)[0],
    };

    const now: NowWeatherAPIResponse = {
      rain: response.current()!.variables(0)?.value()!,
      temp: response.current()!.variables(1)?.value()!,
      sunshine_duration: response.current()!.variables(2)?.value()!,
      wind_speed: response.current()!.variables(3)?.value()!,
      snowfall: response.current()!.variables(4)?.value()!,
    };

    const actualNow: Now = parseCurrentWeather(now);

    const newData: WeatherData = {
      dailyWeather: dailyWeather,
      hourlyWeather: hourlyWeather,
      currentWeather: now,
      now: actualNow,
    };

    setWeatherData(newData);
  };

  return {
    requestWeatherData,
    weatherData,
  };
};

export default WeatherCardHook;
