import React from 'react'
import styled from "styled-components";
import { Team } from "../../../../../constants/types/team";
import { Channels } from './Channels';
import { TeamUsers } from './TeamUsers';
import { PushRight } from './TeamSidebarView';

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
                setOpenDirectUserModal={onAddDirectUserClick}
            />

            {currentTeam.admin && <PushRight>
                <div>
                    <a
                        href="#invite-people" onClick={onInvitePeopleClick}
                    >
                        + Invite People
                    </a>
                </div>

            </PushRight>}

        </TeamOptionsWrapper>);
}