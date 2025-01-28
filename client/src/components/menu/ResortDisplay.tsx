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
import TextItem from "./TextItem";


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
           <TextItem title="Snow Cannons: " data={currentResort["Snow cannons"]}/>
           <TextItem title="Night Skiing: " data={""}  icon={currentResort.Nightskiing == "Yes" ? <CheckIcon sx={{fill:"green"}}/> : <CloseIcon sx={{fill:"red"}}/>}/>
           <TextItem title="Summer Skiing: " data={""} icon={currentResort["Summer skiing"] == "Yes" ? <CheckIcon sx={{fill:"green"}}/> : <CloseIcon sx={{fill:"red"}}/>}/>
           <TextItem title="Longest Run: " data={currentResort["Longest run"]} dataAdornment="km"/>
          </MenuCard>
          
        <MenuCard gridSize={6}>
        <Typography variant="h6" gutterBottom>
        Season & Pricing
      </Typography>
      <TextItem title="Season Start: " data={currentResort.Season}/>
      <TextItem title="Season End: " data={currentResort.Season}/>
      <TextItem title="Pass Price: " data={`$${currentResort.Price}`}/>
      </MenuCard>

    
        <MenuCard gridSize={7}>
          <Typography variant="h6" gutterBottom>
             Mountain Stats
          </Typography>
          <TextItem title="Highest Point: " data={currentResort["Highest point"]} dataAdornment="m"/>
          <TextItem title="Lowest Point: " data={currentResort["Lowest point"]} dataAdornment="m"/>
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