import React, { useState } from "react";

import { Teams } from "./Teams";
import { Channels } from "./Channels";
import AddChannelModal from "./AddChannelModal";
import InvitePeopleModal from "./InvitePeopleModal";
import { TeamsArray, Team } from "../../../../constants/types/team";
import { Channel } from "../../../../constants/types/channel";

interface Props {
  currentChannel: Channel;
  currentTeam: Team;
  username: string;
}

interface User {
  id?: number;
  username?: string;
}


const Sidebar: React.FC<Props & TeamsArray> = ({ username, teams, currentTeam, currentChannel }) => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState<boolean>(false);
  const [openInvitePeopleModal, setOpenInvitePeopleModal] = useState<boolean>(false);


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
        teams={teams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />

      <Channels
        currentTeam={currentTeam}
        currentChannel={currentChannel}
        username={username}
        onAddChannelClick={() => setOpenAddChannelModal(true)}
        onInvitePeopleClick={() => setOpenInvitePeopleModal(true)}
      />

    </>
  );
};

export default Sidebar