import { Box } from "@mui/material";
import { SkiResort } from "../WorldMap/IconLayer";
import MenuCard from "./MenuCard";
import TextItem from "./TextItem";
import LandscapeTwoToneIcon from "@mui/icons-material/LandscapeTwoTone";

interface MountainStats {
  currentResort: SkiResort;
}

const MountainStats = ({ currentResort }: MountainStats) => {
  return (
    <MenuCard title="Mountain Stats">
      <Box paddingTop={2}>
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
      </Box>
    </MenuCard>
  );
};

export default MountainStats;
