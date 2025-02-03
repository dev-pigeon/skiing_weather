export interface DailyWeatherAPIResponse {
    min_temp: number[];
    max_temp: number[];
    min_feel_temp: number[];
    max_feel_temp: number[];
    showers_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
}

export interface NowWeatherAPIResponse {
  rain : number,
  temp : number,
  sunshine_duration : number,
  wind_speed : number,
  snowfall : number,
}

export interface HourlyWeatherAPIResponse {
  temp: number[];
  precipitation_probability: number[];
  precipitation: number[];
  snowfall: number[];
  snow_depth: number[];
  cloud_cover: number[]; //percent
  visibility: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
  rain : number[];
  showers:number[];
}

export interface DailyWeather {
    days : Day[]
}

export interface HourlyWeather {
    hours : Hour[]
}


export interface Day {
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
    cloud_cover: "Clear Sky" | "Partly Cloudly" | "Partly Sunny" | "Overcast";
    max_temp: number;
    min_temp: number;
    sunny: boolean;
    rainy: boolean;
    snowy: boolean;
    foggy: boolean;
    windy: boolean;
  }

  export interface Now {
    temp : number,
    conditions : string,
    icon?: React.ReactNode,
  }


  
  export interface Hour {
    time: string;
    condition: "Clear Sky" | "Parly Sunny" | "Parly Cloudy" | "Overcast";
    sunny: boolean;
    rainy: boolean;
    snowy: boolean;
    foggy: boolean;
    windy: boolean;
  }
  