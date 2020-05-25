import React from "react";
import { FieldProps } from "formik";
import { FormField, Checkbox } from "semantic-ui-react";

interface Props {
  title: string;
  inactiveTitle: string;
  name: string;
  type: "radio" | "checkbox" | undefined;
}

export const RadioToggle: React.FC<Props & FieldProps> = ({
  title,
  name,
  type,
  inactiveTitle,
  field,
  form,
  ...props
}) => {
  return (
    <FormField>
      <Checkbox
        toggle
        label={field.value ? title : inactiveTitle}
        name={name}
        type={type}
        onChange={field.onChange}
        {...props}
        checked={field.value}
      />
    </FormField>
  );
};
