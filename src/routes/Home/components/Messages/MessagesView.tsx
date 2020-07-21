import React from 'react'
import { Comment } from 'semantic-ui-react';
import { Message } from '../../../../constants/types/message';
import { FileUpload } from '../FileUpload';
import { FileDisplay } from '../../../../shared-components/FileDisplay';

interface Props {
    messages: Array<Message>
    channelId: number;
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

export const MessagesView: React.FC<Props> = ({ messages, channelId }) => {

    return (
        <FileUpload channelId={channelId} >
            <Comment.Group>
                {[...messages].reverse().map(messageListItem)}
            </Comment.Group>
        </FileUpload>
    );

}