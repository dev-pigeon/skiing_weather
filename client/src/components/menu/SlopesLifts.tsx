import { Stack } from "@mui/material";
import IconPaths from "./IconPaths";
import { SkiResort } from "../WorldMap/IconLayer";
import CustomIcon from "./CustomIcon";
import MenuCard from "./MenuCard";
import DifficultyChart from "./PieChart";
interface SlopesLifts {
  currentResort: SkiResort;
}

const SlopesLifts = ({ currentResort }: SlopesLifts) => {
  return (
    <MenuCard divider sx={{ width: 200 }} title="Slopes & Lifts">
      <Stack direction={"row"} paddingTop={2} spacing={0.5}>
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
        />{" "}
      </Stack>
      <DifficultyChart currentResort={currentResort} />
    </MenuCard>
  );
};

export default SlopesLifts;
