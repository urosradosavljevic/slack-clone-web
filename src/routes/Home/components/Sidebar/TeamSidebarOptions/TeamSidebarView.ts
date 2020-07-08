import styled from "styled-components";

const paddingLeft = "padding-left: 10px";

export const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

export const SideBarListItem = styled.li`
  padding: 2px;
  cursor: pointer;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

export const SideBarListHeader = styled.li`
  ${paddingLeft};
`;

export const PushRight = styled.div`
  ${paddingLeft};
`;
