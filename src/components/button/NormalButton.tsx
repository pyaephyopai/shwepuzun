import { Theme } from "@emotion/react";

import { SvgIconComponent } from "@mui/icons-material";

import { Button, SxProps } from "@mui/material";

type ButtonProps = {
  text: string;
  type: "contained" | "outlined" | "text";
  sx?: SxProps<Theme>;
  icon?: SvgIconComponent;
  onClick?: () => void;
  disable?: boolean;
};

const NormalButton = ({
  text,
  type,
  sx,
  icon: Icon,
  disable = false,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      variant={type}
      type="submit"
      disabled={disable}
      sx={{
        letterSpacing: "1px",
        textTransform: "capitalize",

        color: "#fff",
        bgcolor: "secondary.main",

        ":hover": {
          bgcolor: "secondary.light",
        },

        display: "block",

        ...sx,
      }}
      onClick={onClick}
    >
      {Icon && <Icon fontSize="small" />} {text}
    </Button>
  );
};

export default NormalButton;
