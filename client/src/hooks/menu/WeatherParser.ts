import { NowWeatherAPIResponse } from "./WeatherInterfaces";


// get your weather icons here!! https://www.flaticon.com/free-icons/weather


export function parseCurrentWeather(currentWeather : NowWeatherAPIResponse) {
    const currentTemp = parseInt(currentWeather.temp.toFixed(0));
    const sunConditions = getSunshineClass(currentWeather.sunshine_duration, "Now"); // use for icon
    const rainCondition = getRainConditions(currentWeather.rain, "Now");
    const displayCondition = getDisplayCondition(rainCondition, sunConditions);

    // dont forget to add snowfall to current api request!
}

// this function will determine sun conditions
// default is for current time (15 mins) 
// tm = 4 is an hour, tm=96 is for a day
function getSunshineClass(sunDuration : number, type : "Now" | "Hour" | "Day") : string {
   const multiplier = getMultiplier(type);
   if(sunDuration >= (12 * multiplier)) {
    return "Sunny"
   } else if(sunDuration >= (8 * multiplier) && sunDuration <= ((11 * multiplier))) {
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

function getDisplayCondition(rainCondition : string, sunCondition : string) {
    if(rainCondition != "No Rain") {
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