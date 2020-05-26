import React, { useState } from "react";
import decode from "jwt-decode";

import { Teams } from "./Teams";
import { Channels } from "./Channels";
import AddChannelModal from "./AddChannelModal";
import InvitePeopleModal from "./InvitePeopleModal";
import { AllTeamsArray, TeamItem } from "../../../../constants/types";

interface Props {
  currentTeam: TeamItem;
}

interface User {
  id?: number;
  username?: string;
}

interface TokenData {
  user: User;
}

const Sidebar: React.FC<Props & AllTeamsArray> = ({ allTeams, currentTeam }) => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState<boolean>(false);
  const [openInvitePeopleModal, setOpenInvitePeopleModal] = useState<boolean>(false);

  let user: User = {};

  try {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenData = decode<TokenData>(token);
      user = tokenData.user;
    }
  } catch (error) { }

  return (
    <>

      <AddChannelModal
        teamId={currentTeam.id}
        open={openAddChannelModal}
        onClose={() => setOpenAddChannelModal(false)}
      />

      <InvitePeopleModal
        teamId={currentTeam.id}
        open={openInvitePeopleModal}
        onClose={() => setOpenInvitePeopleModal(false)}
      />

      <Teams
        teams={allTeams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />

      <Channels
        teamId={currentTeam.id}
        teamName={currentTeam.name}
        teamOwner={currentTeam.owner === user.id}
        channels={currentTeam.channels}
        onAddChannelClick={() => setOpenAddChannelModal(true)}
        onInvitePeopleClick={() => setOpenInvitePeopleModal(true)}
        username={user.username || ""}
        users={[
          { id: 1, name: "slackbot", online: true },
          { id: 2, name: "slacfkbot", online: false },
        ]}
      />

    </>
  );
};

export default Sidebar