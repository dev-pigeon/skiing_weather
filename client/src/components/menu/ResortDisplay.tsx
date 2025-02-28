import { SkiResort } from "../WorldMap/IconLayer";
import { Stack } from "@mui/material";
import MountainStats from "./MountainStats";
import WeatherCard from "./WeatherCard/WeatherCard";

interface ResortDisplay {
  currentResort: SkiResort;
}

const ResortDisplay = ({ currentResort }: ResortDisplay) => {
  return (
    <Stack
      width={"100%"}
      direction={"row"}
      gap={1}
      display={"flex"}
      flexWrap={"wrap"}
      justifyContent={"center"}
      alignItems={"center"}
      padding={2}
      overflow={"auto"}
    >
      <WeatherCard currentResort={currentResort} />
      <MountainStats currentResort={currentResort} />
    </Stack>
  );
};
export default ResortDisplay;
