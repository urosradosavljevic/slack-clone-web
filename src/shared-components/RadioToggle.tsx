import React from "react";
import { FieldProps } from "formik";
import { FormField, Checkbox } from "semantic-ui-react";

interface Props {
  title: string;
  inactiveTitle: string;
  name: string;
  type: "radio" | "checkbox" | undefined;
  setFieldValue: (field: string, value: any) => void;
}

export const RadioToggle: React.FC<Props & FieldProps> = ({
  title,
  name,
  type,
  inactiveTitle,
  field,
  setFieldValue,
  form,
  ...props
}) => {
  return (
    <FormField>
      <Checkbox
        toggle
        name={name}
        type={type}
        onChange={() => setFieldValue(field.name, !field.checked)}
        checked={!field.value}
        {...props}
      />
    </FormField>
  );
};
