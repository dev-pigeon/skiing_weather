export interface DailyWeatherAPIResponse {
    min_temp: number[];
    max_temp: number[];
    min_feel_temp: number[];
    max_feel_temp: number[];
    showers_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    wind_gusts_10m_max: number[];
    weather_code : number[];
}

export interface NowWeatherAPIResponse {
  rain : number,
  temp : number,
  sunshine_duration : number,
  wind_speed : number,
  snowfall : number,
  weather_code : number,
}

export interface HourlyWeatherAPIResponse {
  temp: number[];
  weather_code : number[];
}



export interface Day {
    date: string;
    dateDescriptor: string,
    max_temp: number;
    min_temp: number;
    iconTitle : string,
  }

  export interface Now {
    temp : number,
    display_label : string,
    icon_title: string,
  }


  
  export interface Hour {
    time: string;
    iconTitle : string;
    temperature : number | string;
  }
  