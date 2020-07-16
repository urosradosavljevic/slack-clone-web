import React from "react";
import { Field } from "formik";
import { Button } from "semantic-ui-react";
import styled from "styled-components";

import { TextInput } from "../../../../shared-components/TextInput";
import { FileUpload } from "../FileUpload";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
  display: grid;
  grid-template-columns: 50px 1fr;
`;

interface Props {
  placeholder: string;
  channelId?: number;
}

export const SendMessageView: React.FC<Props> = ({ placeholder, channelId }) => {
  return (
    <SendMessageWrapper>
      <FileUpload button={true} channelId={channelId}>
        <Button icon='plus' />
      </FileUpload>
      <Field
        fluid
        name="text"
        placeholder={`Message #${placeholder}`}
        component={TextInput}
      />
    </SendMessageWrapper>
  );
};
