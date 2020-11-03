import { Box } from "@material-ui/core";
import React from "react";

export type FormWrapperVariant = "small" | "regular";
interface FormWrapperProps {
  variant?: FormWrapperVariant;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Box
      display="flex"
      minWidth={variant === "regular" ? "800px" : "500px"}
      minHeight={variant === "regular" ? "800px" : "500px"}
    >
      {children}
    </Box>
  );
};

export default FormWrapper;
