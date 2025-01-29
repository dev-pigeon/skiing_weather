import { PropsWithChildren, useState } from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent } from "@mui/material";

interface MenuCard {
  gridSize: number;
  sx?: object;
}

const MenuCard = ({ children, gridSize, sx }: PropsWithChildren<MenuCard>) => {
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

  return (
    <Card
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      sx={{
        boxShadow: isMouseOver ? 20 : 2,
        borderRadius: 5,
        transition: "box-shadow 0.75s ease-in-out",
        ...sx,
      }}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default MenuCard;
