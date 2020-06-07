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
