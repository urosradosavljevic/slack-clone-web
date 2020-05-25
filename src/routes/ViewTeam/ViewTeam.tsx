import React from "react";
import { useQuery } from "@apollo/react-hooks";
import findIndex from "lodash/findIndex";

import AppWrapper from "./components/AppWrapper";
import MessagesWrapper from "./components/MessagesWrapper";
import { Header } from "./components/Header";
import { SendMessage } from "./components/SendMessage";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { RouteComponentProps } from "react-router-dom";
import { AllTeamsArray } from "../../constants/types";
import { allTeamsQuery } from "../../graphql/team";

interface Params {
  match: string;
  teamId: string;
  channelId: string;
}

export const ViewTeam = ({
  match: { params },
}: RouteComponentProps<Params>) => {
  const currentTeamId = parseInt(params.teamId, 10)
  const currentChannelId = parseInt(params.channelId, 10)
  const { loading, data } = useQuery(allTeamsQuery);

  if (loading) {
    return null;
  }

  const { allTeams }: AllTeamsArray = data.allTeams && data;



  const teamIdx = !!currentTeamId
    ? findIndex(allTeams, ["id", currentTeamId])
    : 0;

  const currentTeam = allTeams[teamIdx];
  const currentChannelIdx = currentChannelId ? findIndex(currentTeam.channels, ["id", currentChannelId]) : 0
  const currentChannel = currentTeam.channels[currentChannelIdx]

  return (
    <AppWrapper>
      <Sidebar allTeams={allTeams} currentTeam={currentTeam} />
      <Header channelName={currentChannel.name} />
      <MessagesWrapper></MessagesWrapper>
      <SendMessage channelName={currentChannel.name} />
    </AppWrapper>
  );
};
