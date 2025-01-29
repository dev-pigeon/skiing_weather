import { Box } from "@mui/material";
import { SkiResort } from "../WorldMap/IconLayer";
import MenuCard from "./MenuCard";
import TextItem from "./TextItem";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";

interface SeasonPricing {
  currentResort: SkiResort;
}

const SeasonPricing = ({ currentResort }: SeasonPricing) => {
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  useEffect(() => {
    const trimmedSeason = currentResort.Season.trim();
    const seasonArr = trimmedSeason.split("-");
    setStart(seasonArr[0]);
    setEnd(seasonArr[1]);
  }, [currentResort]);

  return (
    <MenuCard sx={{ width: 250 }} title="Season & Pricing">
      <Box paddingTop={2}>
        <TextItem
          title="Season Start: "
          data={start}
          icon={<CalendarMonthOutlinedIcon />}
        />
        <TextItem
          title="Season End: "
          data={end}
          icon={<CalendarMonthOutlinedIcon />}
        />
        <TextItem
          title="Pass Price: "
          data={`$${currentResort.Price}`}
          icon={<MonetizationOnOutlinedIcon />}
        />
      </Box>
    </MenuCard>
  );
};

export default SeasonPricing;
