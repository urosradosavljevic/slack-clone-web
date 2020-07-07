import React from 'react'
import styled from "styled-components";
import { Team } from "../../../../../constants/types/team";
import { Channels } from './Channels';
import { TeamUsers } from './TeamUsers';

const TeamOptionsWrapper = styled.div`
  grid-column: 2;
  grid-row: 1 / 4;
  background-color: #4e3a4c;
  color: #958993;
`;

interface Props {
    currentTeam: Team;
    username: string;
    onAddChannelClick: () => void;
    onInvitePeopleClick: () => void;
    onAddDirectUserClick: () => void;
}


export const TeamSidebarOptions: React.FC<Props> = ({
    currentTeam,
    username,
    onAddChannelClick,
    onInvitePeopleClick,
    onAddDirectUserClick
}) => {
    return (
        <TeamOptionsWrapper>
            <Channels
                currentTeam={currentTeam}
                username={username}
                onAddChannelClick={onAddChannelClick}
            />

            <TeamUsers
                currentTeam={currentTeam}
                users={[{ id: 0, name: "zagorka" }, { id: 1, name: "tifani" }]}
                setOpenInvitePeopleModal={onInvitePeopleClick}
                setOpenDirectUserModal={onAddDirectUserClick}
            />

        </TeamOptionsWrapper>);
}