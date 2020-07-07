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

export const userQuery = gql`
  query User($userId: Int!) {
    user(userId: $userId) {
      id
      email
      username
    }
  }
`;
