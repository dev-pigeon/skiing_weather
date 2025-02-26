import { SkiResort } from "../../WorldMap/IconLayer";
import MenuCard from "../MenuCard";
import { useEffect } from "react";
import WeatherCardHook from "../../../hooks/menu/useWeatherCard";
import CurrentConditions from "./CurrentConditions";
import DailyConditions from "./DailyConditions";
import { Stack } from "@mui/material";
import HourlyConditions from "./HourlyConditions";
interface WeatherCard {
  currentResort: SkiResort;
}

const WeatherCard = ({ currentResort }: WeatherCard) => {
  const useWeatherCard = WeatherCardHook();
  useEffect(() => {
    useWeatherCard.requestWeatherData(
      parseFloat(currentResort.coordinates[1]),
      parseFloat(currentResort.coordinates[0])
    );
  }, [currentResort]);
  return (
    <div>
      {useWeatherCard.weatherData && (
        <MenuCard sx={{ width: 220 }}>
          <CurrentConditions
            useWeatherCard={useWeatherCard}
            currentResort={currentResort}
          />

          <Stack
            paddingTop={3}
            paddingBottom={3}
            direction={"row"}
            spacing={2}
            sx={{ overflowY: "hidden", overflowX: "scroll" }}
          >
            {useWeatherCard.weatherData.hourlyWeather.map((hour) => (
              <HourlyConditions
                temperature={hour.temperature}
                time={hour.time}
                iconTitle={hour.iconTitle}
              />
            ))}
          </Stack>
          <Stack
            direction={"column"}
            spacing={1}
            height={90}
            sx={{ overflowX: "hidden", overflowY: "scroll" }}
          >
            {useWeatherCard.weatherData.dailyWeather.map((day) => (
              <DailyConditions
                monthDay={day.date}
                dateTitle={day.dateDescriptor}
                iconTitle={day.iconTitle}
                maxTemp={day.max_temp.toFixed(0)}
                minTemp={day.min_temp.toFixed(0)}
              />
            ))}
          </Stack>
        </MenuCard>
      )}
    </div>
  );
};

export default WeatherCard;
