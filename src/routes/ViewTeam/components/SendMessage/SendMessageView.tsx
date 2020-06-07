import React from "react";
import { Field } from "formik";
import styled from "styled-components";
import { TextInput } from "../../../../shared-components/TextInput";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

interface Props {
  channelName: string;
}

export const SendMessageView: React.FC<Props> = ({ channelName }) => {
  return (
    <SendMessageWrapper>
      <Field
        fluid
        name="text"
        placeholder={`Message #${channelName}`}
        component={TextInput}
      />
    </SendMessageWrapper>
  );
};
