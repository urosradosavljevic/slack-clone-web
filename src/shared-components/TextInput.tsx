import React from "react";
import { getIn, FieldProps } from "formik";
import { FormField, Input, Label } from "semantic-ui-react";

interface Props {
  title: string;
  name: string;
}

export const TextInput: React.FC<Props & FieldProps> = ({
  title,
  name,
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);
  return (
    <FormField>
      <label htmlFor={name}>{title}</label>
      <Input name={name} {...field} {...props} fluid />
      {errorText && (
        <Label basic color="red" pointing>
          {errorText}
        </Label>
      )}
    </FormField>
  );
};
