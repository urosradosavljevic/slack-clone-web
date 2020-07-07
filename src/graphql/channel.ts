import gql from "graphql-tag";

export const createChannelMutation = gql`
  mutation CreateChannel($name: String!, $teamId: Int!, $public: Boolean) {
    createChannel(name: $name, teamId: $teamId, public: $public) {
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
