import { Stack, Typography } from "@mui/material";
import WeatherIcon from "./WeatherIcon";

interface DailyConditions {
  monthDay: string;
  dateTitle:
    | "Today"
    | "Tomorrow"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  iconTitle: string;
  maxTemp: string | number;
  minTemp: string | number;
}

const DailyConditions = ({
  monthDay,
  dateTitle,
  iconTitle,
  maxTemp,
  minTemp,
}: DailyConditions) => {
  return (
    <Stack
      direction={"row"}
      spacing={4.25}
      justifyContent={"cener"}
      alignItems={"center"}
    >
      <Stack direction={"column"}>
        <Typography color="grey" whiteSpace={"nowrap"} fontSize={10}>
          {monthDay}
        </Typography>
        <Typography fontSize={12}>{dateTitle}</Typography>
      </Stack>

      <Stack direction={"row"} spacing={1}>
        <WeatherIcon name={iconTitle} />
        <Typography fontSize={14}>{`${maxTemp}°`}</Typography>
        <Typography color="grey" fontSize={14}>{`${minTemp}°`}</Typography>
      </Stack>
    </Stack>
  );
};

export default DailyConditions;
