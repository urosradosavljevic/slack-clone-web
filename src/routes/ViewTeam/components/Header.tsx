import React from "react";
import styled from "styled-components";
import { Header as SemanticHeader } from "semantic-ui-react";

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

interface Props {
  channelName: string;
}

export const Header: React.FC<Props> = ({ channelName }) => {
  return (
    <HeaderWrapper>
      <SemanticHeader textAlign="center">#{channelName}</SemanticHeader>
    </HeaderWrapper>
  );
};
