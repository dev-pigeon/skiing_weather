import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { SkiResort } from "../WorldMap/IconLayer";
import MenuCard from "./MenuCard";
import LandscapeTwoToneIcon from "@mui/icons-material/LandscapeTwoTone";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import DownhillSkiingOutlinedIcon from "@mui/icons-material/DownhillSkiingOutlined";
import { useState, useEffect } from "react";
import IconPaths from "./IconPaths";
import CustomIcon from "./CustomIcon";

interface MountainStats {
  currentResort: SkiResort;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  data: number | string | null;
}

const MountainStats = ({ currentResort }: MountainStats) => {
  const [features, setFeatures] = useState<Feature[] | undefined>(undefined);

  function buildFeatures() {
    const newFeatures: Feature[] = [
      {
        title: "Pass Price",
        icon: <MonetizationOnOutlinedIcon />,
        data: `$${currentResort.Price}`,
      },
      {
        title: "Season Dates",
        icon: <CalendarMonthOutlinedIcon />,
        data: currentResort.Season,
      },

      {
        title: "Longest Run",
        icon: <DownhillSkiingOutlinedIcon />,
        data: `${currentResort["Longest run"]} km`,
      },
      {
        title: "Highest Point",
        icon: <LandscapeTwoToneIcon />,
        data: `${currentResort["Highest point"]}m`,
      },
      {
        title: "Lowest Point",
        icon: <LandscapeTwoToneIcon />,
        data: `${currentResort["Lowest point"]}m`,
      },
    ];
    setFeatures(newFeatures);
  }

  useEffect(() => {
    buildFeatures();
  }, [currentResort]);
  return (
    <MenuCard
      divider
      title="Features & Stats"
      sx={{ height: 315, justifyContent: "left" }}
    >
      <List
        sx={{
          height: 180,
          overflowX: "hidden",
          overflowY: "scroll",
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {features?.map((feature) => (
          <ListItem sx={{ position: "relative", right: 15, height: 60 }}>
            <ListItemAvatar>
              <Avatar>{feature.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={feature.title} secondary={feature.data} />
          </ListItem>
        ))}
      </List>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        paddingTop={2}
        spacing={0.5}
      >
        <CustomIcon
          toolTip={`Surface Lifts`}
          svgPath={IconPaths.SurfaceLift.path}
          displayData={currentResort["Surface lifts"]}
        />
        <CustomIcon
          toolTip="Chair Lifts"
          svgPath={IconPaths.ChairLift.path}
          displayData={currentResort["Chair lifts"]}
        />
        <CustomIcon
          toolTip="Gondola Lifts"
          viewBox="0 0 60 60"
          svgPath={IconPaths.Gondola.path}
          displayData={currentResort["Gondola lifts"]}
        />{" "}
      </Stack>
    </MenuCard>
  );
};

export default MountainStats;
