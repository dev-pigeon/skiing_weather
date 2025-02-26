export interface DailyWeatherAPIResponse {
    min_temp: number[];
    max_temp: number[];
    weather_code : number[];
}

export interface NowWeatherAPIResponse {
  temp : number,
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
  