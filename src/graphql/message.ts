import gql from "graphql-tag";

export const channelMessagesQuery = gql`
  query ChannelMessages($cursor: String!, $channelId: Int!) {
    channelMessages(cursor: $cursor, channelId: $channelId) {
      text
      user {
        id
        username
      }
      createdAt
      url
      filetype
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
      url
      filetype
    }
  }
`;

export const sendMessageMutation = gql`
  mutation SendMessage($channelId: Int!, $text: String, $file: Upload) {
    sendMessage(channelId: $channelId, text: $text, file: $file) {
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
        url
        filetype
      }
    }
  }
`;
