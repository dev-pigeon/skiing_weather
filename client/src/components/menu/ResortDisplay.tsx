import { SkiResort } from "../WorldMap/IconLayer";
import IconPaths from "../../assets/IconPaths";
import Grid from '@mui/material/Grid2';
import TriangleContainer from "./TriangleContainer";
import CustomIcon from "./CustomIcon";
import DifficultyChart from "./PieChart";
import { Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import MenuCard from "./MenuCard";

interface ResortDisplay {
    currentResort : SkiResort,
  }

  const ResortDisplay = ({currentResort} : ResortDisplay) => {

    return (
      <Grid container columns={{md:12}} rowSpacing={1} columnSpacing={0}>

        <MenuCard gridSize={6}>
          <Typography variant="h6" gutterBottom>
            Resort Features
          </Typography>
            <Typography>
              <strong>Snow Cannons:</strong> 36
            </Typography>
              <Typography>
                <strong>Night Skiing:</strong>{" "}
                <CloseIcon color="error" fontSize="small" />
            </Typography>
            <Typography>
                <strong>Day Skiing:</strong>{" "}
                <CheckIcon color="success" fontSize="small" />
            </Typography>
            <Typography>
               <strong>Longest Run:</strong> 7 km
             </Typography>

          </MenuCard>
          
        <MenuCard gridSize={6}>
      <Typography variant="h6" gutterBottom>
        Resort Features
      </Typography>
      <Typography>
        <strong>Snow Cannons:</strong> {currentResort["Snow cannons"]}
      </Typography>
      <Typography>
        <strong>Night Skiing:</strong> 
        {currentResort.Nightskiing ? (
          <CheckIcon color="success" fontSize="small" />
        ) : (
          <CloseIcon color="error" fontSize="small" />
        )}
      </Typography>
      <Typography>
        <strong>Longest Run:</strong> {currentResort["Longest run"]} km
      </Typography>

      </MenuCard>

    
        <MenuCard gridSize={7}>
            <Typography variant="h6" gutterBottom>
              Mountain Stats
            </Typography>
            <Typography>
              <strong>Highest Point:</strong> {currentResort["Highest point"]} m
            </Typography>
            <Typography>
              <strong>Lowest Point:</strong> {currentResort["Lowest point"]} m
            </Typography>

        </MenuCard>
        
    
    
      <TriangleContainer>
      <CustomIcon toolTip={`Surface Lifts`} svgPath={IconPaths.SurfaceLift.path} displayData={currentResort["Surface lifts"]} />
    <CustomIcon toolTip="Chair Lifts" svgPath={IconPaths.ChairLift.path} displayData={currentResort["Chair lifts"]} />
    <CustomIcon toolTip="Gondola Lifts" viewBox="0 0 60 60" svgPath={IconPaths.Gondola.path} displayData={currentResort["Gondola lifts"]} />
    </TriangleContainer>

 
      <DifficultyChart currentResort={currentResort} />
  
        </Grid>
    )
  }
  export default ResortDisplay;