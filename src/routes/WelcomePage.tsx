import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { allUsers } from "../graphql/user";
import { User } from "../constants/types/user";

interface Props { }

export const WelcomePage: React.FC<Props> = () => {
  const { loading, data } = useQuery(allUsers);

  if (loading) return <h2>loading</h2>;

  if (data !== undefined) {
    const { allUsers } = data;
    console.log(allUsers)

    return allUsers.map(
      (user: User) => (
        <h1 key={user.id}>{user.email}</h1>
      )
    );

  }
  return null
};
