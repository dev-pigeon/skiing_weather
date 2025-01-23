import { Stack, Grid2 } from "@mui/material";
import React from "react";
import { PropsWithChildren } from "react";

const TriangleContainer = ({ children }: PropsWithChildren) => {
    const childrenArr = React.Children.toArray(children);
    return (
       <Grid2 paddingTop={1} size={4}>
            <Stack direction="column" spacing={2} alignItems="center">
            <Stack direction="row" spacing={2} justifyContent="center">
                <>{childrenArr[0]}</>
                <>{childrenArr[1]}</>
            </Stack>
            <Stack direction="row" justifyContent="center">
                <>{childrenArr[2]}</>
            </Stack>
        </Stack>
       </Grid2>
     
    );
};

export default TriangleContainer;
