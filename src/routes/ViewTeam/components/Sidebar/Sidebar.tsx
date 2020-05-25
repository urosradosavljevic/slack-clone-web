import React, { useState } from "react";
import decode from "jwt-decode";

import { Teams } from "./Teams";
import { Channels } from "./Channels";
import AddChannelModal from "./AddChannelModal";
import { AllTeamsArray, TeamItem } from "../../../../constants/types";

interface Props {
  currentTeam: TeamItem;
}

export const Sidebar: React.FC<Props & AllTeamsArray> = ({ allTeams, currentTeam }) => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState<boolean>(
    false
  );


  let username = "";

  try {
    const token = localStorage.getItem("token");
    if (token) {
      const { user } = decode(token);
      username = user.username;
    }
  } catch (error) { }

  return (
    <>

      <AddChannelModal
        teamId={currentTeam.id}
        open={openAddChannelModal}
        onClose={() => setOpenAddChannelModal(false)}
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
        channels={currentTeam.channels}
        onAddChannelClick={() => setOpenAddChannelModal(true)}
        username={username}
        users={[
          { id: 1, name: "slackbot", online: true },
          { id: 2, name: "slacfkbot", online: false },
        ]}
      />

    </>
  );
};
