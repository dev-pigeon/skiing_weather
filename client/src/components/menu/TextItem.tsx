import { Typography, Box, SvgIconProps } from '@mui/material';


interface TextItem {
    data : number | string,
    dataAdornment?: string,
    icon? : SvgIconProps, // not sure what the actual type is yet
    iconAtEnd?:boolean,
    iconAtStart?:boolean,
    tooltip?: string,
    sx?: object,
}

const TextItem = ({data}:TextItem) => {
  
    return (
       <Box >
         <Typography  >{data}</Typography>
       </Box>
    )
}

export default TextItem;