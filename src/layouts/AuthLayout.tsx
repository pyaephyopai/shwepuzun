import { CSSProperties, ReactNode } from "react";

import { Container } from "@mui/material";

type AuthLayoutProps = {
  children: ReactNode;
  sx?: CSSProperties;
};

const AuthLayout = ({ children, sx }: AuthLayoutProps) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        paddingY: "16px",
        margin: "0px",

        height: {
          md: "100vh",
          sx: "100%",
        },

        bgcolor: "#F5DEB3",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        ...sx,
      }}
    >
      {children}
    </Container>
  );
};

export default AuthLayout;
