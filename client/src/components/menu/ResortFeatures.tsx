import { Box } from "@mui/material";
import { SkiResort } from "../WorldMap/IconLayer";
import MenuCard from "./MenuCard";
import TextItem from "./TextItem";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DownhillSkiingOutlinedIcon from "@mui/icons-material/DownhillSkiingOutlined";

interface ResortFeatures {
  currentResort: SkiResort;
}

const ResortFeatures = ({ currentResort }: ResortFeatures) => {
  return (
    <MenuCard divider title="Resort Features">
      <Box paddingTop={2}>
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
          icon={<DownhillSkiingOutlinedIcon />}
        />
      </Box>
    </MenuCard>
  );
};

export default ResortFeatures;
