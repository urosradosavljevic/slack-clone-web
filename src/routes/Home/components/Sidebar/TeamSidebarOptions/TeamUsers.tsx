import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { SideBarList, SideBarListItem, SideBarListHeader } from "./TeamSidebarView";
import { Team } from "../../../../../constants/types/team";
import { TEAM_HOME_ROUTE } from "../../../../../constants/routes";
import { AddCircleButton } from "../../../../../shared-components/AddCircleButton";

interface Props {
    currentTeam: Team;
    setOpenDirectChannelModal: () => void;
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
    setOpenDirectChannelModal,
}) => {

    const user = ({ id, name }: { id: number, name: string }) => (
        <Link key={`dmChannel-${id}`} to={`${TEAM_HOME_ROUTE}/${currentTeam.id}/${id}`}>
            <SideBarListItem >
                <Bubble online={true} />
                {name}
            </SideBarListItem>
        </Link>
    )

    return (
        <>
            <SideBarList>
                <SideBarListHeader>
                    Direct Messages
                    <AddCircleButton
                        onClick={setOpenDirectChannelModal}
                    />
                </SideBarListHeader>
                {currentTeam.channels.filter(c => c.dm).map(user)}
            </SideBarList>
        </>
    )
};
