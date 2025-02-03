import { NowWeatherAPIResponse } from "./WeatherInterfaces";


// get your weather icons here!! https://www.flaticon.com/free-icons/weather


export function parseCurrentWeather(currentWeather : NowWeatherAPIResponse) {
    const currentTemp = parseInt(currentWeather.temp.toFixed(0));
    const sunConditions = getSunshineClass(currentWeather.sunshine_duration, "Now"); // use for icon
    const rainCondition = getRainConditions(currentWeather.rain, "Now");
    const snowCondition = getSnowCondition(currentWeather.snowfall, "Now");
    const displayConditionText = getDisplayCondition(rainCondition, sunConditions, snowCondition);
    
    console.log("hi");
}

function getDisplayIcon(sun : string, rain : string, snow : string) {
    // basically it can be totally sunny (no rain)
    // partially sunny with rain or snow
    // or cloudy
    if(sun == "Partly Sunny" || sun == "Partly Cloudy") {
        return getPartlyIcon(rain, snow);
    } else if(sun == "Cloudy") {
        return getCloudyIcon(rain, snow);
    }
    return "Sunny"
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

function getSnowCondition(snowCM : number,  type : "Now" | "Hour" | "Day") {
    const multiplier = getMultiplier(type);
    if(snowCM >= (3 * multiplier)) {
        return "Heavy Snow"
    } else if(snowCM >= (1 * multiplier) && snowCM < (3* multiplier)) {
        return "Snow"
    } else if(snowCM >= (.1 * multiplier) && snowCM < (1 * multiplier)) {
        "Light Snow"
    } 
    return "No Snow";
}

function getDisplayCondition(rainCondition : string, sunCondition : string, snowCondition : string) {
    // snow by default
    // then rain
    // then if its sun

    if(snowCondition != "N Snow") {
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