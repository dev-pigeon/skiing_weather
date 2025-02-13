import { Box } from "@mui/material";

interface WeatherIcon {
  name: string;
  width?: string | number;
  height?: string | number;
}

const WeatherIcon = ({ name, height, width }: WeatherIcon) => {
  return (
    <Box>
      <img
        src={`/${name}.png`}
        height={height ? height : 25}
        width={width ? width : 25}
      />
    </Box>
  );
};

export default WeatherIcon;
