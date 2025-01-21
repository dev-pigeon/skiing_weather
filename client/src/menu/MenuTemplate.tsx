import {

    IconButton,
    Paper,
    Stack,
    Typography,
    styled,
  } from "@mui/material";
  import Grid from '@mui/material/Grid2';
  import { type PropsWithChildren, type ReactNode } from "react";
  
  import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
 
  
  export const MenuTemplate = ({
    children
  }: PropsWithChildren): ReactNode => {
    return (
      <Grid position={"absolute"}  sx={{ zIndex: 9999, top:"25vh", left:"2vw" }} container>
        <Stack
          gap={1}
          component={MenuPaper}
          sx={{
            width:"auto",
            overflow: "auto",
            height:"auto",
            minWidth: 150,
          }}
        >
          <Stack
            direction="row"
            sx={{
              width: "100%",
            }}
          >
            <PrimaryColorTitle
              variant="h6"
              sx={{ margin: "auto", whiteSpace: "normal" }}
            >
              {"title"}
            </PrimaryColorTitle>

            <IconButton sx={{position:"absolute", top: -2.5, right: 2, "&:focus": { outline: "none" },}}>
                <CancelOutlinedIcon/>
            </IconButton>

          </Stack>
          {children}
        </Stack>
      </Grid>
    );
  };
  
  export const MenuPaper = styled(Paper)<{
    width?: number;
    maxWidth?: number | string;
  }>(({ width, maxWidth }) => ({
    display: "flex",
    alignItems: "center",
    minWidth: "100px",
    width: width ? `${width}px` : "auto",
    maxWidth: maxWidth ? maxWidth : undefined,
    minHeight: "100px",
    maxHeight: "90vh",
    backgroundColor: "rgba(255, 255, 255, .85)",
    pointerEvents: "all",
    borderRadius: 20,
    overflowWrap: "break-word",
    zIndex: 9999,
  }));
  
  const PrimaryColorTypography = styled(Typography)(({ }) => ({
    color: "black",
  }));
  
  export const PrimaryColorTitle = styled(PrimaryColorTypography)(() => ({
    fontWeight: "bold",
  }));