import { CSSProperties, ReactNode } from "react";

import { Button } from "@mui/material";

type ButtonIconProps = {
  icon: ReactNode;
  type: "contained" | "outlined" | "text";
  sx?: CSSProperties;
};

const ButtonIcon = ({ icon, type, sx }: ButtonIconProps) => {
  return (
    <Button
      variant={type}
      sx={{
        borderWidth: "2px",

        borderColor: "#8B4513",
        color: "#8B4513",

        "&:hover": {
          border: "2px solid #8B4513",
        },

        ...sx,
      }}
    >
      {icon}
    </Button>
  );
};

export default ButtonIcon;
