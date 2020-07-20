import React from 'react'
import { Comment, Button } from 'semantic-ui-react';
import { Message } from '../../../../constants/types/message';
import MessagesWrapper from './MessagesWrapper';
import { FileUpload } from '../FileUpload';
import { FileDisplay } from '../../../../shared-components/FileDisplay';
import { FetchMoreQueryOptions } from 'apollo-client';

interface Props {
    messages: Array<Message>
    channelId: number;
    hasMoreMessages: boolean;
    fetchMoreMessages: (cursor: string) => void;
}

const messageListItem = (m: Message, i: number) => <Comment key={i}>
    <Comment.Content>
        <Comment.Author as='a'>{m.user.username}</Comment.Author>
        <Comment.Metadata>
            <div>{m.createdAt}</div>
        </Comment.Metadata>
        {m.url ?
            <FileDisplay url={m.url} filetype={m.filetype} /> :
            <Comment.Text>{m.text}</Comment.Text>}
    </Comment.Content>
</Comment>

export const MessagesView: React.FC<Props> = ({ messages, channelId, fetchMoreMessages, hasMoreMessages }) => {

    return (
        <FileUpload channelId={channelId} >
            <MessagesWrapper>
                <Comment.Group>
                    {hasMoreMessages && messages.length >= 15 && <Button onClick={() => { fetchMoreMessages(messages[messages.length - 1].createdAt) }}>Load More</Button>}
                    {[...messages].reverse().map(messageListItem)}
                </Comment.Group>
            </MessagesWrapper>
        </FileUpload>
    );

}