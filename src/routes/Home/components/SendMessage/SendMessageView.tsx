import React from "react";
import { Input } from "semantic-ui-react";

import { TextInput } from "../../../../shared-components/TextInput";

interface Props {
  placeholder: string;
  channelId?: number;
  setFieldValue: (field: string, value: any) => void;
  isSubmitting: boolean;
  values: any;
  submitForm: () => void;
}

export const SendMessageView: React.FC<Props> = ({ placeholder, channelId, setFieldValue, isSubmitting, values, submitForm }) => {
  return (
    <Input
      fluid
      name="text"
      placeholder={`Message #${placeholder}`}
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13 && !!isSubmitting) {
          e.preventDefault();
          submitForm();
        }
      }}
      value={values.text}
      onChange={(e: React.FormEvent<HTMLInputElement>) => setFieldValue("text", e.currentTarget.value)}
      component={TextInput}
    />
  );
};
