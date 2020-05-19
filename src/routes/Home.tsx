import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const allUsersQuery = gql`
  query {
    allUsers {
      id
      email
    }
  }
`;

export const Home = () => {
  const { loading, data } = useQuery(allUsersQuery);

  if (loading) return <h2>loading</h2>;

  const { allUsers } = data;

  return allUsers.map(
    (user: { id: string | number | undefined; email: React.ReactNode }) => (
      <h1 key={user.id}>{user.email}</h1>
    )
  );
};
