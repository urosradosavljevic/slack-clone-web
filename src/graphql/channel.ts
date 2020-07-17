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
