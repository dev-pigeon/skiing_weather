import { SkiResort } from "../WorldMap/IconLayer";
import IconPaths from "../../assets/IconPaths";
import CustomIcon from "./CustomIcon";
import DifficultyChart from "./PieChart";
import { Stack } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MenuCard from "./MenuCard";
import TextItem from "./TextItem";
import LandscapeTwoToneIcon from "@mui/icons-material/LandscapeTwoTone";
import AcUnitIcon from "@mui/icons-material/AcUnit";

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
      <MenuCard sx={{ width: 200 }} title="Season & Pricing">
        <TextItem title="Season Start: " data={currentResort.Season} />
        <TextItem title="Season End: " data={currentResort.Season} />
        <TextItem title="Pass Price: " data={`$${currentResort.Price}`} />
      </MenuCard>

      <MenuCard sx={{ width: 200 }} title="Slopes & Lifts">
        <Stack direction={"row"} paddingTop={2}>
          <CustomIcon
            ttBottom
            toolTip={`Surface Lifts`}
            svgPath={IconPaths.SurfaceLift.path}
            displayData={currentResort["Surface lifts"]}
          />
          <CustomIcon
            ttBottom
            toolTip="Chair Lifts"
            svgPath={IconPaths.ChairLift.path}
            displayData={currentResort["Chair lifts"]}
          />
          <CustomIcon
            ttBottom
            toolTip="Gondola Lifts"
            viewBox="0 0 60 60"
            svgPath={IconPaths.Gondola.path}
            displayData={currentResort["Gondola lifts"]}
          />
        </Stack>

        <DifficultyChart currentResort={currentResort} />
      </MenuCard>

      <MenuCard title="Mountain Stats">
        <TextItem
          title="Highest Point: "
          data={currentResort["Highest point"]}
          dataAdornment="m"
          icon={<LandscapeTwoToneIcon />}
        />
        <TextItem
          title="Lowest Point: "
          data={currentResort["Lowest point"]}
          dataAdornment="m"
          icon={<LandscapeTwoToneIcon />}
        />
      </MenuCard>

      <MenuCard title="Resort Features">
        <TextItem
          whiteSpace="nowrap"
          title="Snow Cannons: "
          data={currentResort["Snow cannons"]}
          icon={<AcUnitIcon sx={{ fill: "blue" }} />}
        />
        <TextItem
          title="Night Skiing: "
          data={""}
          icon={
            currentResort.Nightskiing == "Yes" ? (
              <CheckIcon sx={{ fill: "green" }} />
            ) : (
              <CloseIcon sx={{ fill: "red" }} />
            )
          }
        />
        <TextItem
          title="Summer Skiing: "
          data={""}
          icon={
            currentResort["Summer skiing"] == "Yes" ? (
              <CheckIcon sx={{ fill: "green" }} />
            ) : (
              <CloseIcon sx={{ fill: "red" }} />
            )
          }
        />
        <TextItem
          title="Longest Run: "
          data={currentResort["Longest run"]}
          dataAdornment="km"
        />
      </MenuCard>
    </Stack>
  );
};
export default ResortDisplay;
