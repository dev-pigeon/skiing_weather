import { Box } from "@mui/material";
import { SkiResort } from "../WorldMap/IconLayer";
import MenuCard from "./MenuCard";
import TextItem from "./TextItem";

interface SeasonPricing {
  currentResort: SkiResort;
}

const SeasonPricing = ({ currentResort }: SeasonPricing) => {
  return (
    <MenuCard sx={{ width: 200 }} title="Season & Pricing">
      <Box paddingTop={2}>
        <TextItem title="Season Start: " data={currentResort.Season} />
        <TextItem title="Season End: " data={currentResort.Season} />
        <TextItem title="Pass Price: " data={`$${currentResort.Price}`} />
      </Box>
    </MenuCard>
  );
};

export default SeasonPricing;
