import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { DirectUserModalView } from "./DirectUserModalView";
import { teamMembersQuery } from "../../../../../graphql/team";

interface Props {
  teamId: number;
  myId: number;
  open: boolean;
  onClose: () => void;
}

const DirectUserModal: React.FC<Props> = ({ open, onClose, teamId, myId }) => {

  const { loading, data } = useQuery(teamMembersQuery, {
    variables: { teamId }
  });

  if (loading) {
    return null;
  }

  return (
    <DirectUserModalView
      teamId={teamId}
      myId={myId}
      users={data.teamMembers}
      open={open}
      onClose={onClose}
    />
  )
}

export default DirectUserModal;
