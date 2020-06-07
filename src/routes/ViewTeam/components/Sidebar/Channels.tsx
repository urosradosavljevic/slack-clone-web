import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Team } from "../../../../constants/types/team";
import { Channel } from "../../../../constants/types/channel";

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


const channelItem = ({ id, name }: Channel, teamId: number) => (
  <Link key={`channel-${id}`} to={`/view-team/${teamId}/${id}`}>
    <SideBarListItem># {name}</SideBarListItem>
  </Link>
);


const user = ({ id, name }: { id: number, name: string }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble online={true} />
    {name}
  </SideBarListItem>
);

interface Props {
  currentTeam: Team;
  currentChannel: Channel;
  username: string;
  onAddChannelClick: () => void;
  onInvitePeopleClick: () => void;
}

export const Channels: React.FC<Props> = ({
  currentTeam,
  currentChannel,
  username,
  onAddChannelClick,
  onInvitePeopleClick,
}) => (
    <ChannelWrapper>
      <PushRight>
        <TeamNameHeader>{currentTeam.name}</TeamNameHeader>
        {username}
      </PushRight>
      <div>
        <SideBarList>
          <SideBarListHeader>
            Channels
          {currentTeam.admin && <AddIconWrapper>
              <Icon onClick={onAddChannelClick} name="add circle" />
            </AddIconWrapper>}
          </SideBarListHeader>
          {currentTeam.channels.map(c => channelItem(c, currentTeam.id))}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarListHeader>Direct Messages</SideBarListHeader>
          {[{ id: 0, name: "zagorka" }, { id: 1, name: "tifani" }].map(user)}
        </SideBarList>

        {currentTeam.admin && <PushRight>
          <div>
            <a href="#invite-people" onClick={onInvitePeopleClick}>
              + Invite People
          </a>
          </div>

        </PushRight>}
      </div>
    </ChannelWrapper>
  );
