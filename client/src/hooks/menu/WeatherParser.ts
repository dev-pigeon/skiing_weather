import {  DailyWeatherAPIResponse, Day, Hour, HourlyWeatherAPIResponse, Now, NowWeatherAPIResponse } from "./WeatherInterfaces";
import dayjs, { Dayjs } from "dayjs";


export function parseCurrentWeather(currentWeather : NowWeatherAPIResponse) {
    const is_day = getIsDay();
    const currentTemp = parseInt(currentWeather.temp.toFixed(0));
    const displayConditionText = getWeatherDescription(currentWeather.weather_code);
    const displayIconTitle = getIconTitle(currentWeather.weather_code, is_day);
    const current_weather : Now = {
        temp : currentTemp,
        display_label : displayConditionText,
        icon_title: displayIconTitle,
    }
    return current_weather;
}

export function parseHourlyWeather(hourlyWeather : HourlyWeatherAPIResponse) {

    const now = dayjs();
    const hours : Hour[] = [];
    const roundedTime = roundToNearestHour(now)
    for(let i = 0; i < 24; ++i) {
        const time = roundedTime.add(i+1, "hour");
        const day = getIsDay(time);
        const weather_code = hourlyWeather.weather_code[i];
        const iconTitle = getIconTitle(weather_code, day)
        const temperature = hourlyWeather.temp[i].toFixed(0);


        const hour : Hour = {
            time : time.format("hh:mm a"),
            iconTitle : iconTitle,
            temperature : temperature
        }
        hours.push(hour);
    }
    return hours;
}

function roundToNearestHour(time : Dayjs) {
    return time.minute() >= 30 
        ? time.add(1, 'hour').startOf('hour')  // Round up
        : time.startOf('hour');                // Round down
}

export function parseDailyWeather(dailyWeather : DailyWeatherAPIResponse) {
   const days : Day[] = [];
   const dayobj = dayjs();
    for(let i = 1; i < 7; ++i) {
        const date = dayobj.add(i, "day").format("MMMM D");
        const dateName = dayobj.add(i, "day").format("dddd");
        const day : Day = {
            date : date,
            dateDescriptor : dateName,
            max_temp : dailyWeather.max_temp[i],
            min_temp : dailyWeather.min_temp[i],
            iconTitle : getIconTitle(dailyWeather.weather_code[i], true)
        }
        days.push(day);
    }
    return days;
}



function getIsDay(dayIn? : Dayjs) {
    // assume day starts at 6am and ends at 6pm
    const hour = dayIn ? dayIn.hour() : dayjs().hour();
    return (hour >= 6 && hour <= 18);
}

function getIconTitle(weatherCode : number, is_day : boolean) {
   if(weatherCode == 0 || weatherCode == 1) {
    return is_day ? "ClearSkiesDay" : "ClearSkiesNight";
   }

   if(weatherCode == 3) {
    return "Cloudy";
   }
 
   if(weatherCode == 2){
    return is_day ? "PartlyCloudyDay" : "PartlyCloudlyNight"
   }

   if(weatherCode == 53 || weatherCode == 63 || weatherCode == 81) {
    return "Rain";
   }

   if(weatherCode == 51 || weatherCode == 61 || weatherCode == 80) {
    return "LightRain";
   }
   
   if(weatherCode == 55 || weatherCode == 65 || weatherCode == 82) {
    return "HeavyRain";
   }

   if(weatherCode == 71 || weatherCode == 73 || weatherCode == 75 || weatherCode == 77 || weatherCode == 85 || weatherCode == 86) {
    return "Snow";
   }
   return "";
}



function getWeatherDescription(weatherCode : number) {
    switch(weatherCode) {
        case 0:
            return "Clear Sky";
        case 1:
            return "Clear Sky"
        case 2:
            return "Partly Cloudly";
        case 3:
            return "Overcast";
        case 45:
            return "Foggy";
        case 48:
            return "Foggy";
        case 51:
            return "Light Drizzle";
        case 53:
            return "Moderate Drizzle";
        case 55:
            return "Heavy Drizzle";
        case 61:
            return "Light Rain";
        case 63:
            return "Moderate Rain";
        case 65:
            return "Heavy Rain";
        case 66:
            return "Freezing Rain";
        case 67:
            return "Freezing Rain";
        case 71:
            return "Light Snow";
        case 73:
            return "Moderate Snow";
        case 75:
            return "Heavy Snow";
        case 77:
            return "Snow Grains";
        case 80:
            return "Light Showers";
        case 81:
            return "Moderate Showers";
        case 82:
            return "Heavy Showers";
        case 85:
            return "Light Snow";
        case 86:
            return "Heavy Snow";
        case 95:
            return "Thunderstorm";
        case 16:
            return "Windy";
    }
    return "";
}
