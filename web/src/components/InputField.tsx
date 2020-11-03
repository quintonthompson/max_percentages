import { FormControl, FormLabel, Input, TextField } from "@material-ui/core";
import { ErrorMessage, useField } from "formik";

import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  //these fields make them required
  name: string;
  label: string;
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input {...field} id={field.name} placeholder={props.placeholder} />
    </FormControl>
  );
};

export default InputField;
