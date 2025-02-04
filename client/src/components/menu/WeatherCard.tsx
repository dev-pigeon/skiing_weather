import { Stack, Typography } from "@mui/material";
import { SkiResort } from "../WorldMap/IconLayer";
import MenuCard from "./MenuCard";
import { useEffect } from "react";
import WeatherCardHook from "../../hooks/menu/useWeatherCard";
import WeatherIcon from "./WeatherIcon";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
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
          <Stack direction={"row"} spacing={6}>
            <Stack alignItems={"left"} spacing={0} justifyContent={"center"}>
              <Stack direction={"row"}>
                <LocationOnOutlinedIcon fontSize="small" />
                <Typography whiteSpace={"normal"} variant={"caption"}>
                  {currentResort.Resort}
                </Typography>
              </Stack>

              <Typography fontWeight={"bold"} variant="h4" color="black">
                {`${useWeatherCard.weatherData.now.temp}°`}
              </Typography>
            </Stack>
            <Stack spacing={0.5} alignItems={"center"}>
              <WeatherIcon name="sun" />
              <Typography fontWeight={575} fontSize={"12px"}>
                {useWeatherCard.weatherData.now.display_label}
              </Typography>
            </Stack>
          </Stack>
        </MenuCard>
      )}
    </div>
  );
};

export default WeatherCard;
