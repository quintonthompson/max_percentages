import { Box } from "@material-ui/core";
import Wrapper, { WrapperVariant } from "./Wrapper";
import React from "react";

interface LayoutProps {
  variant?: WrapperVariant;
}

const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <Box height="100vh">
      <Wrapper variant={variant}> {children} </Wrapper>
    </Box>
  );
};

export default Layout;
