import React from "react";
import { useQuery } from "@apollo/react-hooks";
import findIndex from "lodash/findIndex";
import { RouteComponentProps, useHistory } from "react-router-dom";

import AppWrapper from "./components/AppWrapper";
import MessagesWrapper from "./components/MessagesWrapper";
import { Header } from "./components/Header";
import { SendMessage } from "./components/SendMessage";
import Sidebar from "./components/Sidebar"

import { AllTeamsArray } from "../../constants/types";
import { allTeamsQuery } from "../../graphql/team";
import { Error } from "../Error";

interface Params {
  match: string;
  teamId: string;
  channelId: string;
}

export const ViewTeam = ({
  match: { params },
}: RouteComponentProps<Params>) => {
  const history = useHistory();
  const currentTeamId = parseInt(params.teamId, 10)
  const currentChannelId = parseInt(params.channelId, 10)

  const { loading, data } = useQuery(allTeamsQuery);

  if (loading) {
    return null;
  }

  if (!data) {
    history.push("/create-team")
    return null;
  }

  const { allTeams, inviteTeams }: AllTeamsArray = data.allTeams && data;
  let teams = []
  if (inviteTeams) {
    teams = [...allTeams, ...inviteTeams]
  } else {
    teams = [...allTeams]
  }

  console.log("teams", teams)

  // TODO: Show add channel and team buttons only on right users's screen

  const teamIdx = !!currentTeamId ? findIndex(teams, ["id", currentTeamId]) : 0;
  const currentTeam = teamIdx === -1 ? teams[0] : teams[teamIdx];

  const currentChannelIdx = currentChannelId ? findIndex(currentTeam.channels, ["id", currentChannelId]) : 0
  const currentChannel = currentChannelIdx === -1 ? currentTeam.channels[0] : currentTeam.channels[currentChannelIdx]

  return (
    <AppWrapper>
      <Sidebar allTeams={teams} currentTeam={currentTeam} />
      {currentChannel && <>
        <Header channelName={currentChannel.name} />
        <MessagesWrapper></MessagesWrapper>
        <SendMessage channelName={currentChannel.name} />
      </>}
    </AppWrapper>
  );
};
