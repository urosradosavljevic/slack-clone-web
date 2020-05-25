import React from "react";
import styled from "styled-components";
import { Input } from "semantic-ui-react";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

interface Props {
  channelName: string;
}

export const SendMessage: React.FC<Props> = ({ channelName }) => {
  return (
    <SendMessageWrapper>
      <Input fluid placeholder={`Message #${channelName}`} />
    </SendMessageWrapper>
  );
};
