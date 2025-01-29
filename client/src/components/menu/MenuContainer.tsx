import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  Dispatch,
  SetStateAction,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { SkiResort } from "../WorldMap/IconLayer";

interface MenuContainer {
  setCurrentResort: Dispatch<SetStateAction<SkiResort | undefined>>;
  currentResort: SkiResort | undefined;
}

export const MenuContainer = ({
  children,
  setCurrentResort,
  currentResort,
}: PropsWithChildren<MenuContainer>): ReactNode => {
  return (
    <Grid
      position={"absolute"}
      columns={{ md: 3 }}
      sx={{ top: "15vh", left: "2vw" }}
      container
    >
      <Stack
        gap={1}
        component={MenuPaper}
        sx={{
          width: 550,
          overflow: "auto",
          height: "auto",
          minWidth: 150,
        }}
      >
        <Box textAlign={"center"} width={"80%"}>
          <PrimaryColorTitle
            variant="h6"
            sx={{ margin: "auto", whiteSpace: "normal" }}
          >
            {`${currentResort?.Resort}, ${currentResort?.Country}`}
          </PrimaryColorTitle>
        </Box>

        <Box>
          <IconButton
            onClick={() => {
              setCurrentResort(undefined);
            }}
            sx={{
              wordBreak: "break",
              position: "absolute",
              top: -2.5,
              right: 2,
              "&:focus": { outline: "none" },
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
        </Box>
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
  zIndex: 90,
}));

const PrimaryColorTypography = styled(Typography)(({}) => ({
  color: "black",
  whiteSpace: "normal",
  padding: 0,
}));

export const PrimaryColorTitle = styled(PrimaryColorTypography)(() => ({
  fontWeight: "bold",
}));
