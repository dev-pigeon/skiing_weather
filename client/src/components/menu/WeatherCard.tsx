import { Stack, Typography } from "@mui/material";
import { SkiResort } from "../WorldMap/IconLayer";
import MenuCard from "./MenuCard";
import { useEffect } from "react";
import WeatherCardHook from "../../hooks/menu/useWeatherCard";

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
        <MenuCard>
          <Stack
            direction={"row"}
            justifyContent={"space-betwee"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Typography variant="h5" color="black">
                {`${useWeatherCard.weatherData?.currentWeather.temp.toFixed(
                  0
                )}°`}
              </Typography>
            </Stack>
          </Stack>
        </MenuCard>
      )}
    </div>
  );
};

export default WeatherCard;
