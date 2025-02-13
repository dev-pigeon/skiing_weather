import { Stack, Tooltip, Typography } from "@mui/material";

import { SkiResort } from "../../WorldMap/IconLayer";
import WeatherIcon from "./WeatherIcon";
import { useWeatherCard } from "../../../hooks/menu/useWeatherCard";

interface CurrentConditions {
  currentResort: SkiResort;
  useWeatherCard: useWeatherCard;
}

const CurrentConditions = ({ useWeatherCard }: CurrentConditions) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
      <Stack alignItems={"left"} spacing={0} justifyContent={"center"}>
        <Tooltip arrow placement="top" title="Current temp in fahrenheit">
          <Typography fontWeight={2} variant="h3" color="black">
            {`${useWeatherCard.weatherData!.now.temp}°`}
          </Typography>
        </Tooltip>
      </Stack>
      <Stack spacing={0.5} alignItems={"center"} paddingRight={0}>
        <WeatherIcon name={useWeatherCard.weatherData!.now.icon_title} />
        <Typography whiteSpace={"nowrap"} fontWeight={575} fontSize={"12px"}>
          {useWeatherCard.weatherData!.now.display_label}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default CurrentConditions;
