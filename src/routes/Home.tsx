import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { Channels } from "../components/Channels";
import AppWrapper from "../components/AppWrapper";
import MessagesWrapper from "../components/MessagesWrapper";
import { Header } from "../components/Header";
import { SendMessage } from "../components/SendMessage";
import { Teams } from "../components/Teams";

const allUsersQuery = gql`
  query {
    allUsers {
      id
      email
    }
  }
`;

interface Props {}

export const Home: React.FC<Props> = () => {
  const { loading, data } = useQuery(allUsersQuery);

  if (loading) return <h2>loading</h2>;

  const { allUsers } = data;

  return (
    <AppWrapper>
      <Teams
        teams={[
          { id: 1, letter: "B" },
          { id: 2, letter: "C" },
        ]}
      />
      <Channels
        teamName="Team name"
        username="Usernamed"
        users={[
          { id: 2, username: "user2", online: true },
          { id: 2, username: "user2", online: false },
        ]}
        channels={[
          { id: 1, name: "channel1" },
          { id: 2, name: "channel2" },
        ]}
      />
      <Header channelName="channel1" />
      <MessagesWrapper></MessagesWrapper>
      <SendMessage channelName="channel1" />
    </AppWrapper>
  );

  return allUsers.map(
    (user: { id: string | number | undefined; email: React.ReactNode }) => (
      <h1 key={user.id}>{user.email}</h1>
    )
  );
};
