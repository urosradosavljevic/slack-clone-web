import gql from "graphql-tag";

export const createChannelMutation = gql`
  mutation CreateChannel(
    $name: String!
    $teamId: Int!
    $public: Boolean
    $members: [Int]
  ) {
    createChannel(
      name: $name
      teamId: $teamId
      public: $public
      members: $members
    ) {
      ok
      channel {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`;

export const getOrCreateDMChannelMutation = gql`
  mutation GetOrCreateDMChannel($teamId: Int!, $members: [Int]) {
    getOrCreateDMChannel(teamId: $teamId, members: $members) {
      ok
      channel {
        id
        name
        dm
      }
      errors {
        path
        message
      }
    }
  }
`;
