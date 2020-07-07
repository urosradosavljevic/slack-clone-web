import gql from "graphql-tag";

export const directMessagesQuery = gql`
  query DirectMessages($receiverId: Int!, $teamId: Int!) {
    directMessages(receiverId: $receiverId, teamId: $teamId) {
      text
      receiver {
        id
        username
      }
      sender {
        id
        username
      }
      createdAt
    }
  }
`;

export const newDirectMessageSubscription = gql`
  subscription NewDirectMessage($channelId: Int!) {
    newDirectMessage(channelId: $channelId) {
      text

      # user {
      #   id
      #   username
      # }
      # createdAt
    }
  }
`;

export const sendDirectMessageMutation = gql`
  mutation SendDirectMessage($teamId: Int!, $text: String!, $receiverId: Int!) {
    sendDirectMessage(teamId: $teamId, text: $text, receiverId: $receiverId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
