import React from 'react'
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const AddIconWrapper = styled.span`
  padding-left: 10px;
  cursor: pointer;
`;

interface Props {
    onClick: () => void;
}

export const AddCircleButton: React.FC<Props> = ({ onClick }) => {
    return (
        <AddIconWrapper>
            <Icon onClick={onClick} name="add circle" />
        </AddIconWrapper>
    );
}