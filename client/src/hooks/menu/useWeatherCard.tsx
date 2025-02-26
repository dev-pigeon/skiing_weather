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
      current: ["temperature_2m", "weather_code"],
      hourly: ["temperature_2m", "weather_code"],
      daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
      temperature_unit: "fahrenheit",
      timezone: "auto",
    };

    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const dailyWeather: DailyWeatherAPIResponse = {
      min_temp: Array.from(response.daily()!.variables(1)?.valuesArray()!),
      max_temp: Array.from(response.daily()!.variables(0)?.valuesArray()!),
      weather_code: Array.from(response.daily()!.variables(2)?.valuesArray()!),
    };

    const hourlyWeather: HourlyWeatherAPIResponse = {
      temp: Array.from(response.hourly()!.variables(0)?.valuesArray()!),
      weather_code: Array.from(response.hourly()!.variables(1)?.valuesArray()!),
    };

    const now: NowWeatherAPIResponse = {
      temp: response.current()!.variables(0)?.value()!,
      weather_code: response.current()!.variables(1)?.value()!,
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
