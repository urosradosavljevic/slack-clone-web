import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SideBarList, SideBarListItem, SideBarListHeader, PushRight } from "./SideBarList";
import { Team } from "../../../../../constants/types/team";
import { AddCircleButton } from "../../../../../shared-components/AddCircleButton";

interface User {
    id: number;
    name: string;
}

interface Props {
    currentTeam: Team;
    users: Array<User>;
    setOpenInvitePeopleModal: () => void;
    setOpenDirectUserModal: () => void;
}

const user = ({ id, name }: { id: number, name: string }) => (
    <SideBarListItem key={`user-${id}`}>
        <Bubble online={true} />
        {name}
    </SideBarListItem>
);

const Green = styled.span`
    color: #38978d;
  `;

const Red = styled.span`
    color: #958993;
  `;

const Bubble = ({ online = true }: { online: boolean }) =>
    online ? <Green>● </Green> : <Red>○ </Red>;

export const TeamUsers: React.FC<Props> = ({
    currentTeam,
    users,
    setOpenInvitePeopleModal,
    setOpenDirectUserModal,
}) => (
        <>
            <SideBarList>
                <SideBarListHeader>
                    Direct Messages
                    <AddCircleButton
                        onClick={setOpenDirectUserModal}
                    />
                </SideBarListHeader>
                {users.map(user)}
            </SideBarList>

            {currentTeam.admin && <PushRight>
                <div>
                    <a
                        href="#invite-people" onClick={setOpenInvitePeopleModal}
                    >
                        + Invite People
                    </a>
                </div>

            </PushRight>}
        </>
    );
