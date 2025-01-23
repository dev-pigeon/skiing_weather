import { Typography } from '@mui/material';


interface GridTextItem {
    data : number | string,
    dataAdornment?: string,
    icon? : any, // not sure what the actual type is yet
    iconAtEnd?:boolean,
    iconAtStart?:boolean,
    tooltip?: string,
    sx?: object,
}

const GridTextItem = ({data}:GridTextItem) => {
    // this is really overkill right now but will include more stuff later
    return (
        <Typography>{data}</Typography>
    )
}

export default GridTextItem;