import { SkiResort } from "../WorldMap/IconLayer";
import { Box, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import TextGroup from "./TextGroup";
import TextItem from "./TextItem";

interface ResortDisplay {
    currentResort : SkiResort,
  }

  const ResortDisplay = ({currentResort} : ResortDisplay) => {

    return (
        <Grid container columns={{md:12}} rowSpacing={3}>

          <TextGroup>
            <TextItem data={`Average season: ${currentResort.Season}`}/>
            <TextItem data={`Average Pass Price: ${(parseInt(currentResort.Price) * 1.04).toFixed(2)}$`}/>
          </TextGroup>
          
            <Grid size={4}>
              <Box padding={1}>
                <Typography>{`Average Pass Price: ${(parseInt(currentResort.Price) * 1.04).toFixed(2)}$`}</Typography>    
              </Box>
            </Grid>


          <TextGroup>
            <TextItem data={`Highest point: ${currentResort["Highest point"]} meters`}/>
            <TextItem data={`Lowest point: ${currentResort["Lowest point"]} meters`}/>
          </TextGroup>

          <TextGroup>
            <TextItem data={`Snow cannons: ${currentResort["Snow cannons"]}`}/>
            <TextItem data={`Longest run: ${currentResort["Longest run"]} kilometers`}/>
          </TextGroup>

            <Grid size={4}>
              <Box padding={1}>
                <Typography>{`Average Pass Price: ${(parseInt(currentResort.Price) * 1.04).toFixed(2)}$`}</Typography>    
              </Box>
            </Grid>

          <TextGroup>
            <TextItem data={`Night skiing: ${currentResort.Nightskiing}`}/>
            <TextItem data={`Summer skiing: ${currentResort["Summer skiing"]}`}/>
          </TextGroup>
        </Grid>
    )
  }
  export default ResortDisplay;