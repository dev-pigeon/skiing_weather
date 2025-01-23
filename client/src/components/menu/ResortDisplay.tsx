import { SkiResort } from "../WorldMap/IconLayer";
import { Box, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import TextGroup from "./TextGroup";
import GridTextItem from "./TextItem";

interface ResortDisplay {
    currentResort : SkiResort,
  }

  const ResortDisplay = ({currentResort} : ResortDisplay) => {

    return (
        <Grid container columns={{md:12}} rowSpacing={3}>

          <TextGroup>
            <GridTextItem data={`Average season: ${currentResort.Season}`}/>
            <GridTextItem data={`Average Pass Price: ${(parseInt(currentResort.Price) * 1.04).toFixed(2)}$`}/>
          </TextGroup>
          
            <Grid size={4}>
              <Box padding={1}>
                <Typography>{`Average Pass Price: ${(parseInt(currentResort.Price) * 1.04).toFixed(2)}$`}</Typography>    
              </Box>
            </Grid>


          <TextGroup>
            <GridTextItem data={`Highest point: ${currentResort["Highest point"]} meters`}/>
            <GridTextItem data={`Lowest point: ${currentResort["Lowest point"]} meters`}/>
          </TextGroup>

          <TextGroup>
            <GridTextItem data={`Snow cannons: ${currentResort["Snow cannons"]}`}/>
            <GridTextItem data={`Longest run: ${currentResort["Longest run"]} kilometers`}/>
          </TextGroup>

            <Grid size={4}>
              <Box padding={1}>
                <Typography>{`Average Pass Price: ${(parseInt(currentResort.Price) * 1.04).toFixed(2)}$`}</Typography>    
              </Box>
            </Grid>


          <TextGroup>
            <GridTextItem data={`Night skiing: ${currentResort.Nightskiing}`}/>
            <GridTextItem data={`Summer skiing: ${currentResort["Summer skiing"]}`}/>
          </TextGroup>

  
        </Grid>
    )
  }
  export default ResortDisplay;