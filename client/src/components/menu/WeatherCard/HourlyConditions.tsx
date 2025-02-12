import { Stack, Typography } from "@mui/material";
import WeatherIcon from "./WeatherIcon";

interface HourlyConditions {
  iconTitle: string;
  time: string;
  temperature: string | number;
}

const HourlyConditions = ({
  iconTitle,
  time,
  temperature,
}: HourlyConditions) => {
  return (
    <Stack
      height={100}
      width={65}
      direction={"column"}
      spacing={0.5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography fontWeight={300} whiteSpace={"nowrap"} fontSize={12}>
        {time}
      </Typography>
      <WeatherIcon name={iconTitle} />
      <Typography fontWeight={600}>{`${temperature}°`}</Typography>
    </Stack>
  );
};

export default HourlyConditions;
