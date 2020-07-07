import React, { useState } from "react";

import { Teams } from "./Teams";
import AddChannelModal from "./AddChannelModal";
import DirectUserModal from "./DirectUserModal";
import InvitePeopleModal from "./InvitePeopleModal";
import { TeamsArray, Team } from "../../../../constants/types/team";
import { TeamSidebarOptions } from "./TeamSidebarOptions/TeamSidebarOptions";

interface Props {
  currentTeam: Team;
  username: string;
}

const Sidebar: React.FC<Props & TeamsArray> = ({ username, teams, currentTeam }) => {
  const [openAddChannelModal, setOpenAddChannelModal] = useState<boolean>(false);
  const [openInvitePeopleModal, setOpenInvitePeopleModal] = useState<boolean>(false);
  const [openDirectUserModal, setOpenDirectUserModal] = useState<boolean>(false);

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

      <DirectUserModal
        teamId={currentTeam.id}
        open={openDirectUserModal}
        onClose={() => setOpenDirectUserModal(false)}
      />

      <Teams
        teams={teams.map((t) => ({
          id: t.id,
          letter: t.name.charAt(0).toUpperCase(),
        }))}
      />

      <TeamSidebarOptions
        currentTeam={currentTeam}
        username={username}
        onAddChannelClick={() => setOpenAddChannelModal(true)}
        onInvitePeopleClick={() => setOpenInvitePeopleModal(true)}
        onAddDirectUserClick={() => setOpenDirectUserModal(!openDirectUserModal)}
      />

    </>
  );
};

export default Sidebar