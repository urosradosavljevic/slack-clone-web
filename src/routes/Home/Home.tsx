import React from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import findIndex from "lodash/findIndex";

import { meQuery } from "../../graphql/user";
import { CREATE_TEAM_ROUTE } from "../../constants/routes";
import HomeWrapper from "./HomeWrapper";
import { Header } from "./components/Header";
import Sidebar from "./components/Sidebar"
import ChannelMessages from "./components/Messages/ChannelMessages";

interface Params {
  match: string;
  teamId: string;
  userId: string;
  channelId: string;
}

export const Home = ({
  match: { params },
}: RouteComponentProps<Params>) => {
  const history = useHistory();

  const currentTeamId = parseInt(params.teamId, 10)
  const currentChannelId = parseInt(params.channelId, 10)
  let currentChannel;

  const { loading, data } = useQuery(meQuery);

  if (loading) {
    return null;
  }

  // if user never created team, redirect
  if (!data.me.teams || data.me.teams.length === 0) {
    history.push(CREATE_TEAM_ROUTE)
    return null;
  }
  const { me: { id, username, teams } } = data.me && data;

  const teamIdx = !!currentTeamId ? findIndex(teams, ["id", currentTeamId]) : 0;
  const currentTeam = teamIdx === -1 ? teams[0] : teams[teamIdx];

  // find current channel 
  const currentChannelIdx = !!currentChannelId ? findIndex(currentTeam.channels, ["id", currentChannelId]) : 0
  currentChannel = currentChannelIdx === -1 ? currentTeam.channels[0] : currentTeam.channels[currentChannelIdx]

  return (
    <HomeWrapper>
      <Sidebar teams={teams} me={{ id, username }} currentTeam={currentTeam} />
      <Header content={currentChannel.name} />
      <ChannelMessages channelId={currentChannel.id} channelName={currentChannel.name} />
    </HomeWrapper>
  );
};
