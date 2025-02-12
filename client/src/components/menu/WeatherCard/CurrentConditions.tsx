import { Stack, Tooltip, Typography } from "@mui/material";

import { SkiResort } from "../../WorldMap/IconLayer";
import WeatherIcon from "./WeatherIcon";
import { useWeatherCard } from "../../../hooks/menu/useWeatherCard";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface CurrentConditions {
  currentResort: SkiResort;
  useWeatherCard: useWeatherCard;
}

const CurrentConditions = ({
  currentResort,
  useWeatherCard,
}: CurrentConditions) => {
  return (
    <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
      <Stack alignItems={"left"} spacing={0} justifyContent={"center"}>
        <Stack direction={"row"}>
          <Tooltip arrow placement="right" title={currentResort.Resort}>
            <LocationOnOutlinedIcon fontSize="small" />
          </Tooltip>
        </Stack>

        <Typography fontWeight={2} variant="h4" color="black">
          {`${useWeatherCard.weatherData!.now.temp}°`}
        </Typography>
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
