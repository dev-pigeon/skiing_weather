
import { Grid2, Stack, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { SkiResort } from '../WorldMap/IconLayer';

interface DifficultyChart {
    currentResort : SkiResort,
}

export default function DifficultyChart({currentResort } : DifficultyChart) {
   
    return (
        <Grid2 size={4}>
            <Stack textAlign={"center"} direction={"column"} paddingTop={1}>
        <Typography>{`Total slopes: ${currentResort['Total slopes']}`}</Typography>
          <PieChart
            className="my-chart"
            slotProps={{
              legend: { hidden: true },
              popper: {
                sx: {
                width:"auto",
                color:"orange",
                zIndex:1000,
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  '& .MuiChartsTooltip-paper': {
                    zIndex:1000,
                    borderRadius:"20px",
                    backgroundColor: "rgb(97, 97, 205)",
                },
                },
              },
            }}
            series={[
              {
                data: [
                  { id: 0, value: parseInt(currentResort['Beginner slopes']), label: 'Easy Slopes', color: "rgba(31,163,17,255)" },
                  { id: 1, value: parseInt(currentResort['Intermediate slopes']), label: 'Intermediate Slopes', color: "rgba(12,131,252,255)" },
                  { id: 2, value: parseInt(currentResort['Difficult slopes']), label: 'Advanced Slopes', color: "rgba(4,4,4,255)" },
                ],
                highlightScope: { fade: 'global', highlight: 'item' },
              }
            ]}
            width={225}
            height={150}
          />
            </Stack>
        </Grid2>
      );
}



