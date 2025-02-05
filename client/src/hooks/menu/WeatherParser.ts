import { Now, NowWeatherAPIResponse } from "./WeatherInterfaces";
import dayjs from "dayjs";



export function parseCurrentWeather(currentWeather : NowWeatherAPIResponse) {
    const is_day = getIsDay();
    console.log(is_day);
    const currentTemp = parseInt(currentWeather.temp.toFixed(0));
    const sunConditions = getSunshineClass(currentWeather.sunshine_duration, "Now", is_day); // use for icon
    const rainCondition = getRainConditions(currentWeather.rain, "Now");
    const snowCondition = getSnowCondition(currentWeather.snowfall, "Now");
    const displayConditionText = getDisplayCondition(rainCondition, sunConditions, snowCondition);
    const displayIconTitle = getDisplayIcon(sunConditions, rainCondition, snowCondition, is_day);
    console.log(`icon / png name = ${displayIconTitle}`)
    const current_weather : Now = {
        temp : currentTemp,
        display_label : displayConditionText,
        icon_title: displayIconTitle,
    }
    return current_weather;
}

function getIsDay() {
    // assume day starts at 6am and ends at 6pm
    const hour = dayjs().hour();
    console.log(hour);
    return (hour >= 6 && hour <= 18);
}

function getDisplayIcon(sun : string, rain : string, snow : string, day : boolean) {
   if(snow != "No Snow") {
    return "Snow"
   } else if(rain != "No Rain") {
    return getRainIconTitle(rain, day);
   } else if(sun == "Partly Sunny" || sun == "Partly Cloudy") {
        return getPartlyIcon(rain, snow);
    } else if(sun == "Cloudy") {
        return getCloudyIcon(rain, snow);
    }
    return day ? "ClearSkiesDay" : "ClearSkiesNight"
}

function getRainIconTitle (rain : string, day : boolean) {
    const adornment = day ? "Day" : "Night"; // add to return once have day/night rain icons
    switch(rain) {
        case "Heavy Rain":
            return "HeavyRain";
        case "Rain":
            return "Rain";
    }
    return "LightRain";
} 

function getCloudyIcon(rain : string, snow : string) {
    if(snow != "No Snow") {
        return "CloudlySnowing"
   }
   if(rain != "No Rain") {
       return "CloudlyRaining"
   } 
   return "Cloudy"
}

function getPartlyIcon(rain : string, snow : string) {
    if(snow != "No Snow") {
         return "PartlyCloudlySnowing"
    }
    if(rain != "No Rain") {
        return "PartlyCloudlyRaining"
    } 
    return "PartlyCloudy"
}
// this function will determine sun conditions
// default is for current time (15 mins) 
// tm = 4 is an hour, tm=96 is for a day
function getSunshineClass(sunDuration : number, type : "Now" | "Hour" | "Day", day : boolean) : string {
        const multiplier = getMultiplier(type);
        if((sunDuration >= (12 * multiplier)) || !day) {
         return "Clear Skies"
        } else if((sunDuration >= (8 * multiplier) && sunDuration <= ((11 * multiplier)))) {
         return "Partly Sunny"
        } else if(sunDuration >=(4 * multiplier) && sunDuration <=(7 * multiplier)) {
         return "Partly Cloudy"
        } 
        return "Cloudy"
}

function getRainConditions(rainMM : number, type : "Now" | "Hour" | "Day") {
    const multiplier = getMultiplier(type);
    if(rainMM >= (4 * multiplier)) {
        return "Heavy Rain";
    } else if(rainMM >= (1.1 * multiplier) && rainMM < (4 * multiplier)) {
        return "Rain";
    } else if(rainMM >= (.1 * multiplier) && rainMM <= (1 * multiplier)) {
        return "Light Rain"
    }
    return "No Rain";
}

function getSnowCondition(snowCM : number,  type : "Now" | "Hour" | "Day") {
    const multiplier = getMultiplier(type);
  
    if(snowCM >= (3 * multiplier)) {
        return "Heavy Snow"
    } else if(snowCM >= (1 * multiplier) && snowCM < (3 * multiplier)) {
        return "Snow"
    } else if(snowCM >= (.1 * multiplier) && snowCM < (1 * multiplier)) {
        return "Light Snow"
    } 
    return "No Snow";
}

function getDisplayCondition(rainCondition : string, sunCondition : string, snowCondition : string) {
    if(snowCondition != "No Snow") {
        return snowCondition;
    }
   else if(rainCondition != "No Rain") {
        return rainCondition;
    }
    return sunCondition;
}

function getMultiplier(type : "Now" | "Hour" | "Day") : number {
    switch(type) {
        case "Now":
            return 1;
        case "Hour":
            return 4
    }
    return 96;
}