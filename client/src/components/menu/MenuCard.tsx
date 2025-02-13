import { PropsWithChildren, useState } from "react";
import { Card, CardContent, Divider, Typography } from "@mui/material";

interface MenuCard {
  sx?: object;
  title?: string;
  divider?: boolean;
}

const MenuCard = ({
  children,
  sx,
  title,
  divider,
}: PropsWithChildren<MenuCard>) => {
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
        margin: 1,
        boxShadow: isMouseOver ? 20 : 2,
        borderRadius: 5,
        transition: "box-shadow 0.75s ease-in-out",
        ...sx,
      }}
    >
      <CardContent>
        {title && <Typography variant="h6">{title}</Typography>}
        {divider && <Divider sx={{ bgcolor: "black" }} />}
        {children}
      </CardContent>
    </Card>
  );
};

export default MenuCard;
