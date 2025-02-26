import { useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import {
  DailyWeatherAPIResponse,
  Day,
  Hour,
  HourlyWeatherAPIResponse,
  Now,
  NowWeatherAPIResponse,
} from "./WeatherInterfaces";
import {
  parseCurrentWeather,
  parseDailyWeather,
  parseHourlyWeather,
} from "./WeatherParser";

interface WeatherData {
  dailyWeather: Day[];
  hourlyWeather: Hour[];
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
        "weather_code",
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
        "weather_code",
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
        "weather_code",
      ],
      temperature_unit: "fahrenheit",
      timezone: "auto",
    };

    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const dailyWeather: DailyWeatherAPIResponse = {
      min_temp: Array.from(response.daily()!.variables(1)?.valuesArray()!),
      max_temp: Array.from(response.daily()!.variables(0)?.valuesArray()!),
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
      weather_code: Array.from(response.daily()!.variables(8)?.valuesArray()!),
    };

    const hourlyWeather: HourlyWeatherAPIResponse = {
      temp: Array.from(response.hourly()!.variables(0)?.valuesArray()!),
      weather_code: Array.from(
        response.hourly()!.variables(10)?.valuesArray()!
      ),
    };

    const now: NowWeatherAPIResponse = {
      rain: response.current()!.variables(0)?.value()!,
      temp: response.current()!.variables(1)?.value()!,
      sunshine_duration: response.current()!.variables(2)?.value()!,
      wind_speed: response.current()!.variables(3)?.value()!,
      snowfall: response.current()!.variables(4)?.value()!,
      weather_code: response.current()!.variables(5)?.value()!,
    };

    const actualNow: Now = parseCurrentWeather(now);
    const hourly: Hour[] = parseHourlyWeather(hourlyWeather);
    const daily = parseDailyWeather(dailyWeather);

    const newData: WeatherData = {
      dailyWeather: daily,
      hourlyWeather: hourly,
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
