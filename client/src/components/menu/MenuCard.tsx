import { PropsWithChildren } from "react"
import Grid from '@mui/material/Grid2';
import { Card, CardContent } from "@mui/material";

interface MenuCard{
    gridSize : number,
    sx? : object
}

const MenuCard = ({children, gridSize, sx} : PropsWithChildren<MenuCard>) => {
    return (
        <Grid size={gridSize} padding={2}>
            <Card sx={sx ? sx : {boxShadow: 2, borderRadius: 5}}>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Grid>
    )
}

export default MenuCard;