import { ReactNode } from "react";

import { Theme } from "@emotion/react";
import { Container, SxProps } from "@mui/material";

type ContainerWrapperProp = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

const ContainerWrapper = ({ children, sx }: ContainerWrapperProp) => {
  return (
    <Container
      component="section"
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
