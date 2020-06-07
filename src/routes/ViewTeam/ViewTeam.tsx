import React from "react";
import { useQuery } from "@apollo/react-hooks";
import findIndex from "lodash/findIndex";
import { RouteComponentProps, useHistory } from "react-router-dom";

import AppWrapper from "./components/AppWrapper";
import { Header } from "./components/Header";
import SendMessage from "./components/SendMessage";
import Sidebar from "./components/Sidebar"


import ChannelMessages from "./components/ChannelMessages";
import { Message } from "semantic-ui-react";
import { meQuery } from "../../graphql/user";

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

  const { loading, data } = useQuery(meQuery);

  if (loading) {
    return null;
  }

  if (!data.me.teams || data.me.teams.length === 0) {
    history.push("/create-team")
    return null;
  }

  const { me: { username, teams } } = data.me && data;

  const teamIdx = !!currentTeamId ? findIndex(teams, ["id", currentTeamId]) : 0;
  const currentTeam = teamIdx === -1 ? teams[0] : teams[teamIdx];

  const currentChannelIdx = currentChannelId ? findIndex(currentTeam.channels, ["id", currentChannelId]) : 0
  const currentChannel = currentChannelIdx === -1 ? currentTeam.channels[0] : currentTeam.channels[currentChannelIdx]

  return (
    <AppWrapper>
      <Sidebar teams={teams} username={username} currentTeam={currentTeam} currentChannel={currentChannel} />
      {currentChannel ? <>
        <Header channelName={currentChannel.name} />
        <ChannelMessages channelId={currentChannel.id} />
        <SendMessage channelId={currentChannel.id} channelName={currentChannel.name} />
      </> : <Message list={["Select channel"]} />}
    </AppWrapper>
  );
};
