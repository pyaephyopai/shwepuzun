import { Theme } from "@emotion/react";
import { Button, SxProps } from "@mui/material";

type ButtonProps = {
  text: string;
  type: "contained" | "outlined" | "text";
  sx?: SxProps<Theme>;
  onSubmit: () => void;
};

const AuthButton = ({ text, type, sx, onSubmit }: ButtonProps) => {
  return (
    <Button
      variant={type}
      type="submit"
      sx={{
        letterSpacing: "1px",
        textTransform: "capitalize",

        fontWeight: "700",

        color: "#fff",

        display: "block",

        ...sx,
      }}
      onClick={onSubmit}
    >
      {text}
    </Button>
  );
};

export default AuthButton;
