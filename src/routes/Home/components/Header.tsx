import React from "react";
import styled from "styled-components";
import { Header as SemanticHeader } from "semantic-ui-react";

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

interface Props {
  content: string;
}

export const Header: React.FC<Props> = ({ content }) => {
  return (
    <HeaderWrapper>
      <SemanticHeader textAlign="center">#{content}</SemanticHeader>
    </HeaderWrapper>
  );
};
