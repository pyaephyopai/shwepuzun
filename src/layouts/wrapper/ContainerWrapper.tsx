import { ReactNode } from "react";

import { Theme } from "@emotion/react";
import { Container, SxProps } from "@mui/material";

type ContainerWrapperProp = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  component?: "header" | "footer" | "section";
};

const ContainerWrapper = ({
  children,
  component = "section",
  sx,
}: ContainerWrapperProp) => {
  return (
    <Container
      component={component}
      maxWidth="inner_wrap"
      sx={{
        ...sx,
      }}
    >
      {children}
    </Container>
  );
};

export default ContainerWrapper;
