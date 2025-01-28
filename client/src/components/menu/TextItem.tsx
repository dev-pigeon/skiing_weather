import { Typography, Stack, } from '@mui/material';


interface TextItem {
    title : string,
    data : number | string,
    dataAdornment?: string,
    icon? : React.ReactNode,
    iconAtEnd?:boolean,
    iconAtStart?:boolean,
    tooltip?: string,
    sx?: object,
}

const TextItem = ({data, title, dataAdornment, icon}:TextItem) => {
  
    return (
       <Stack direction={"row"} spacing={1}>
         <Typography >
            <span style={{fontWeight:"bold"}}>{title}</span>
            {data}
            {dataAdornment}
         </Typography>

        {icon}
       </Stack>
    )
}

export default TextItem;