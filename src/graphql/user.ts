import gql from "graphql-tag";

export const meQuery = gql`
  query Me {
    me {
      id
      email
      username
      teams {
        id
        name
        admin
        channels {
          id
          name
          dm
        }
      }
    }
  }
`;

export const allUsers = gql`
  query {
    allUsers {
      id
      email
      username
    }
  }
`;

export const getUserQuery = gql`
  query GetUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      email
      username
    }
  }
`;
