import { SvgIcon, SvgIconProps, Stack, Typography, Tooltip} from "@mui/material"


interface CustomIcon extends SvgIconProps {
    svgPath : string,
    viewBox?: string,
    toolTip?: string,
    displayData : string | number,
    ttBottom? : boolean,
}

const CustomIcon = ({svgPath, viewBox, displayData, toolTip, ttBottom} : CustomIcon) => {
    return (
        <Stack direction={"row"} spacing={1}>
      <Tooltip title={toolTip ? toolTip : ""} arrow placement={ttBottom ? "bottom" : "top"}>
        <SvgIcon fontSize="large" sx={{fill:"black"}} viewBox={viewBox ? viewBox : "0 0 1024 1024"} >
            <path d={svgPath}/>
        </SvgIcon>
      </Tooltip>
       <Typography>{displayData}</Typography>
        </Stack>
    )
}

export default CustomIcon;