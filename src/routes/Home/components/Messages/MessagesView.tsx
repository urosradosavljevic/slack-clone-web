import React from 'react'
import { Comment } from 'semantic-ui-react';
import { Message } from '../../../../constants/types/message';
import MessagesWrapper from './MessagesWrapper';
import { FileUpload } from '../FileUpload';

interface Props {
    messages: Array<Message>
}

const messageListItem = (m: Message, i: number) => <Comment key={i}>
    <Comment.Content>
        <Comment.Author as='a'>{m.user.username}</Comment.Author>
        <Comment.Metadata>
            <div>{m.createdAt}</div>
        </Comment.Metadata>
        <Comment.Text>{m.text}</Comment.Text>
        <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
    </Comment.Content>
</Comment>

export const MessagesView: React.FC<Props> = ({ messages }) => {
    return (
        <FileUpload >
            <MessagesWrapper>
                <Comment.Group>
                    {messages.map(messageListItem)}
                </Comment.Group>
            </MessagesWrapper>
        </FileUpload>
    );

}