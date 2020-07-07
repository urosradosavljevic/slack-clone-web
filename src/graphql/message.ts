import gql from "graphql-tag";

export const channelMessagesQuery = gql`
  query ChannelMessages($channelId: Int!) {
    channelMessages(channelId: $channelId) {
      text
      user {
        id
        username
      }
      createdAt
    }
  }
`;

export const newChannelMessageSubscription = gql`
  subscription NewChannelMessage($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      text
      user {
        id
        username
      }
      createdAt
    }
  }
`;

export const sendMessageMutation = gql`
  mutation SendMessage($channelId: Int!, $text: String!) {
    sendMessage(channelId: $channelId, text: $text) {
      ok
      errors {
        path
        message
      }
      message {
        id
        text
        user {
          id
          username
        }
      }
    }
  }
`;
