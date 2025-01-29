import { SkiResort } from "../WorldMap/IconLayer";
import IconPaths from "../../assets/IconPaths";
import Grid from "@mui/material/Grid2";
import CustomIcon from "./CustomIcon";
import DifficultyChart from "./PieChart";
import { Stack, Typography } from "@mui/material";
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
    <Grid container columns={{ md: 12 }} rowSpacing={1} columnSpacing={0}>
      <MenuCard gridSize={5}>
        <Typography variant="h6" gutterBottom>
          Slopes & Lifts
        </Typography>
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

      <MenuCard gridSize={6}>
        <Typography variant="h6" gutterBottom>
          Season & Pricing
        </Typography>
        <TextItem title="Season Start: " data={currentResort.Season} />
        <TextItem title="Season End: " data={currentResort.Season} />
        <TextItem title="Pass Price: " data={`$${currentResort.Price}`} />
      </MenuCard>

      <MenuCard gridSize={6}>
        <Typography variant="h6" gutterBottom>
          Mountain Stats
        </Typography>
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

      <MenuCard gridSize={6}>
        <Typography variant="h6" gutterBottom>
          Resort Features
        </Typography>
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
    </Grid>
  );
};
export default ResortDisplay;
