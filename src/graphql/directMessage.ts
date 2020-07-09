import gql from "graphql-tag";

export const directMessagesQuery = gql`
  query DirectMessages($userId: Int!, $teamId: Int!) {
    directMessages(userId: $userId, teamId: $teamId) {
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
  subscription NewDirectMessage($teamId: Int!, $userId: Int!) {
    newDirectMessage(teamId: $teamId, userId: $userId) {
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
