import { SkiResort } from "../WorldMap/IconLayer";
import IconPaths from "../../assets/IconPaths";
import Grid from '@mui/material/Grid2';
import TextGroup from "./TextGroup";
import TextItem from "./TextItem";
import TriangleContainer from "./TriangleContainer";
import CustomIcon from "./CustomIcon";
import DifficultyChart from "./PieChart";

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

          <TriangleContainer>
            <CustomIcon toolTip={`Surface Lifts` } svgPath={IconPaths.SurfaceLift.path} displayData={currentResort["Surface lifts"]}/>
            <CustomIcon toolTip="Chair Lifts" svgPath={IconPaths.ChairLift.path} displayData={currentResort["Chair lifts"]}/>
            <CustomIcon ttBottom toolTip="Gondola Lifts" viewBox="0 0 60 60" svgPath={IconPaths.Gondola.path} displayData={currentResort["Gondola lifts"]}/>
          </TriangleContainer>

          
          
          <TextGroup>
            <TextItem data={`Highest point: ${currentResort["Highest point"]} meters`}/>
            <TextItem data={`Lowest point: ${currentResort["Lowest point"]} meters`}/>
          </TextGroup>

          <TextGroup>
            <TextItem data={`Snow cannons: ${currentResort["Snow cannons"]}`}/>
            <TextItem data={`Longest run: ${currentResort["Longest run"]} kilometers`}/>
          </TextGroup>

        
        {/* gonna put a pie chart there */}
         <DifficultyChart currentResort={currentResort}/>

          <TextGroup>
            <TextItem data={`Night skiing: ${currentResort.Nightskiing}`}/>
            <TextItem data={`Summer skiing: ${currentResort["Summer skiing"]}`}/>
          </TextGroup>
        </Grid>
    )
  }
  export default ResortDisplay;