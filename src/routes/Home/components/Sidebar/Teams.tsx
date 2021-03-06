import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TEAM_HOME_ROUTE, CREATE_TEAM_ROUTE } from "../../../../constants/routes";

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  overflow-y: scroll;
  background-color: #362234;
  color: #958993;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0px;
  list-style: none;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

interface TeamItemProps {
  id: number;
  letter: string;
}

interface Props {
  teams: Array<TeamItemProps>;
}

const teamItem = ({ id, letter }: TeamItemProps) => (
  <Link key={`team-${id}`} to={`${TEAM_HOME_ROUTE}/${id}`}>
    <TeamListItem>{letter}</TeamListItem>
  </Link>
);

export const Teams: React.FC<Props> = ({ teams }) => {
  return (
    <TeamWrapper>
      <TeamList>
        {teams.map(teamItem)}
        <Link key={`create-team`} to={CREATE_TEAM_ROUTE}>
          <TeamListItem>+</TeamListItem>
        </Link>
      </TeamList>
    </TeamWrapper>
  );
};
