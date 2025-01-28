import { Typography, Box, SvgIconProps } from '@mui/material';


interface TextItem {
    title : string,
    data : number | string,
    dataAdornment?: string,
    icon? : SvgIconProps, // not sure what the actual type is yet
    iconAtEnd?:boolean,
    iconAtStart?:boolean,
    tooltip?: string,
    sx?: object,
}

const TextItem = ({data, title, dataAdornment}:TextItem) => {
  
    return (
       <Box >
         <Typography>
            <span style={{fontWeight:"bold"}}>{title}</span>
            {data}
            {dataAdornment}
         </Typography>
       </Box>
    )
}

export default TextItem;