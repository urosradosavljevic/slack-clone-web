import React from "react";
import styled from "styled-components";

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

const Bubble = ({ online = true }: { online: boolean }) =>
  online ? <Green>● </Green> : <Red>○ </Red>;

interface ChannelItemProps {
  id: number;
  name: string;
  teamId?: number;
  public?: boolean;
}

const channelItem = ({ id, name }: ChannelItemProps) => (
  <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>
);

interface UserCardProps {
  id: number;
  username: string;
  online: boolean;
}

const user = ({ id, username, online }: UserCardProps) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble online={online} />
    {username}
  </SideBarListItem>
);

interface Props {
  teamName: string;
  username: string;
  channels: Array<ChannelItemProps>;
  users: Array<UserCardProps>;
}

export const Channels: React.FC<Props> = ({
  teamName,
  username,
  channels,
  users,
}) => (
  <ChannelWrapper>
    <PushRight>
      <TeamNameHeader>{teamName}</TeamNameHeader>
      {username}
    </PushRight>
    <div>
      <SideBarList>
        <SideBarListHeader>Channels</SideBarListHeader>
        {channels.map(channelItem)}
      </SideBarList>
    </div>
    <div>
      <SideBarList>
        <SideBarListHeader>Direct Messages</SideBarListHeader>
        {users.map(user)}
      </SideBarList>
    </div>
  </ChannelWrapper>
);
