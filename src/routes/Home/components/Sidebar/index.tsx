import React, { useState } from "react";

import { Teams } from "./Teams";
import AddChannelModal from "./AddChannelModal";
import AddDirectChannelModal from "./AddDirectChannelModal";
import InvitePeopleModal from "./InvitePeopleModal";
import { TeamsArray, Team } from "../../../../constants/types/team";
import { TeamSidebarOptions } from "./TeamSidebarOptions";

interface Props {
  currentTeam: Team;
  me: {
    id: number;
    username: string;
  }
}

const Sidebar: React.FC<Props & TeamsArray> = ({ me, teams, currentTeam }) => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState<boolean>(false);
  const [openInvitePeopleModal, setOpenInvitePeopleModal] = useState<boolean>(false);
  const [openAddDirectChannelModal, setOpenAddDirectChannelModal] = useState<boolean>(false);

  return (
    <>

      <AddChannelModal
        myId={me.id}
        teamId={currentTeam.id}
        open={openAddChannelModal}
        onClose={() => setOpenAddChannelModal(false)}
      />

      <InvitePeopleModal
        teamId={currentTeam.id}
        open={openInvitePeopleModal}
        onClose={() => setOpenInvitePeopleModal(false)}
      />

      <AddDirectChannelModal
        myId={me.id}
        teamId={currentTeam.id}
        open={openAddDirectChannelModal}
        onClose={() => setOpenAddDirectChannelModal(false)}
      />

      <Teams
        teams={teams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />

      <TeamSidebarOptions
        currentTeam={currentTeam}
        username={me.username}
        onAddChannelClick={() => setOpenAddChannelModal(true)}
        onInvitePeopleClick={() => setOpenInvitePeopleModal(true)}
        onAddDirectChannelClick={() => setOpenAddDirectChannelModal(!openAddDirectChannelModal)}
      />

    </>
  );
};

export default Sidebar