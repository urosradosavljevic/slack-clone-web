import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { SideBarList, SideBarListItem, SideBarListHeader } from "./TeamSidebarView";
import { Team } from "../../../../../constants/types/team";
import { DIRECT_MESSAGE_HOME_ROUTE } from "../../../../../constants/routes";
import { AddCircleButton } from "../../../../../shared-components/AddCircleButton";

interface Props {
    currentTeam: Team;
    setOpenDirectUserModal: () => void;
}


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
    setOpenDirectUserModal,
}) => {

    const user = ({ id, username }: { id: number, username: string }) => (
        <Link key={`user-${id}`} to={`${DIRECT_MESSAGE_HOME_ROUTE}${currentTeam.id}/${id}`}>
            <SideBarListItem >
                <Bubble online={true} />
                {username}
            </SideBarListItem>
        </Link>
    )

    return (
        <>
            <SideBarList>
                <SideBarListHeader>
                    Direct Messages
                    <AddCircleButton
                        onClick={setOpenDirectUserModal}
                    />
                </SideBarListHeader>
                {currentTeam.directMessagedMembers.map(user)}
            </SideBarList>
        </>
    )
};
