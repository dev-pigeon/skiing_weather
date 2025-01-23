import { Grid2, Stack } from "@mui/material"
import { PropsWithChildren } from "react"


const TextGroup = ({children} : PropsWithChildren) => {
    return (
        <Grid2 size={4}>
            <Stack direction={"column"} padding={1} spacing={.5} >
                {children}
            </Stack>
        </Grid2>
    )
}

export default TextGroup;