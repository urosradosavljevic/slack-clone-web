import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ChannelWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

const TeamNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = "padding-left: 10px";

const SideBarListItem = styled.li`
  padding: 2px;
  cursor: pointer;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`
  ${paddingLeft};
`;

const PushRight = styled.div`
  ${paddingLeft};
`;

const Green = styled.span`
  color: #38978d;
`;
const Red = styled.span`
  color: #958993;
`;

const AddIconWrapper = styled.span`
  padding-left: 10px;
  cursor: pointer;
`;

const Bubble = ({ online = true }: { online: boolean }) =>
  online ? <Green>● </Green> : <Red>○ </Red>;


interface ChannelItem {
  id: number;
  name: string;
}

const channelItem = ({ id, name }: ChannelItem, teamId: number) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);

interface UserCardProps {
  id: number;
  name: string;
  online: boolean;
}

const user = ({ id, name, online }: UserCardProps) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble online={online} />
    {name}
  </SideBarListItem>
);

interface Props {
  teamId: number;
  teamName: string;
  username: string;
  teamOwner: boolean;
  channels: Array<ChannelItem>;
  users: Array<UserCardProps>;
  onAddChannelClick: () => void;
  onInvitePeopleClick: () => void;
}

export const Channels: React.FC<Props> = ({
  teamId,
  teamName,
  username,
  channels,
  teamOwner,
  users,
  onAddChannelClick,
  onInvitePeopleClick,
}) => (
    <ChannelWrapper>
      <PushRight>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        {username}
      </PushRight>
      <div>
        <SideBarList>
          <SideBarListHeader>
            Channels
          {teamOwner && <AddIconWrapper>
              <Icon onClick={onAddChannelClick} name="add circle" />
            </AddIconWrapper>}
          </SideBarListHeader>
          {channels.map(c => channelItem(c, teamId))}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>Direct Messages</SideBarListHeader>
          {users.map(user)}
        </SideBarList>

        {teamOwner && <PushRight>
          <div>
            <a href="#invite-people" onClick={onInvitePeopleClick}>
              + Invite People
          </a>
          </div>

        </PushRight>}
      </div>
    </ChannelWrapper>
  );
