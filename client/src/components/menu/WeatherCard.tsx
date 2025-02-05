import { Popover, Stack, Tooltip, Typography } from "@mui/material";
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
        <MenuCard sx={{ width: 200 }}>
          {/* below here to the menu card goes in a separate component */}
          <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
            <Stack alignItems={"left"} spacing={0} justifyContent={"center"}>
              <Stack direction={"row"}>
                <Tooltip arrow placement="right" title={currentResort.Resort}>
                  <LocationOnOutlinedIcon fontSize="small" />
                </Tooltip>
              </Stack>

              <Typography fontWeight={2} variant="h4" color="black">
                {`${useWeatherCard.weatherData.now.temp}°`}
              </Typography>
            </Stack>
            <Stack spacing={0.5} alignItems={"center"} paddingRight={0}>
              <WeatherIcon name={useWeatherCard.weatherData.now.icon_title} />
              <Typography
                whiteSpace={"nowrap"}
                fontWeight={575}
                fontSize={"12px"}
              >
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
