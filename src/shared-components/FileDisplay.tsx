import React from 'react'
import { Comment } from 'semantic-ui-react';

interface Props {
    url: string;
    filetype: string;
}

interface FetchedText {
    text: string;
}

export const FileDisplay: React.FC<Props> = ({ url, filetype }) => {

    if (filetype.startsWith('image/')) {
        return <Comment.Text><img alt='' src={url} /></Comment.Text>
    } else if (filetype.startsWith('audio/')) {
        return <Comment.Text><audio controls>
            <source src={url} type={filetype} />
        </audio></Comment.Text>
    } else {
        return <></>;
    }
}