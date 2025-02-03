import { SkiResort } from "../WorldMap/IconLayer";
import { Stack } from "@mui/material";
import SeasonPricing from "./SeasonPricing";
import SlopesLifts from "./SlopesLifts";
import ResortFeatures from "./ResortFeatures";
import MountainStats from "./MountainStats";
import WeatherCard from "./WeatherCard";
import MyImage from "../../assets/Images/sun.png";

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
      <SeasonPricing currentResort={currentResort} />
      <WeatherCard currentResort={currentResort} />
      <SlopesLifts currentResort={currentResort} />
      <MountainStats currentResort={currentResort} />
      <ResortFeatures currentResort={currentResort} />
      <div>
        <img height={20} width={20} src={MyImage} alt="Description of image" />
      </div>
    </Stack>
  );
};
export default ResortDisplay;
