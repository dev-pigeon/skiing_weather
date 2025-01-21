import { SkiResort } from "../WorldMap/IconLayer";
import { Box, Stack, Typography } from "@mui/material";

interface ResortDisplay {
    currentResort : SkiResort,
  }

  const ResortDisplay = ({currentResort} : ResortDisplay) => {
    return (
        <Stack alignItems={"center"} justifyContent={"center"} spacing={2}>
            <Box padding={2}>
                <Typography>{`Average Pass Price: ${(parseInt(currentResort.Price) * 1.04).toFixed(2)}$`}</Typography>    
            </Box>
        </Stack>
    )
  }

  export default ResortDisplay;