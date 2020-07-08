import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SideBarList, SideBarListItem, SideBarListHeader, PushRight } from "./TeamSidebarView";
import { Team } from "../../../../../constants/types/team";
import { Channel } from "../../../../../constants/types/channel";
import { TEAM_HOME_ROUTE } from "../../../../../constants/routes";
import { AddCircleButton } from "../../../../../shared-components/AddCircleButton";

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const channelItem = ({ id, name }: Channel, teamId: number) => (
  <Link key={`channel-${id}`} to={`${TEAM_HOME_ROUTE}/${teamId}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);


interface Props {
  currentTeam: Team;
  username: string;
  onAddChannelClick: () => void;
}

export const Channels: React.FC<Props> = ({
  currentTeam,
  username,
  onAddChannelClick,
}) => (
    <>
      <PushRight>
        <TeamNameHeader>{currentTeam.name}</TeamNameHeader>
        {username}
      </PushRight>
      <div>
        <SideBarList>
          <SideBarListHeader>
            Channels
          {currentTeam.admin &&
              <AddCircleButton
                onClick={onAddChannelClick}
              />}
          </SideBarListHeader>
          {currentTeam.channels.map(c => channelItem(c, currentTeam.id))}
        </SideBarList>
      </div>
    </>
  );
