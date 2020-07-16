import React, { useState, useEffect } from 'react'
import axios from 'axios';
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
        return <Comment.Text><img src={url} /></Comment.Text>
    } else if (filetype.startsWith('audio/')) {
        return <Comment.Text><audio controls>
            <source src={url} type={filetype} />
        </audio></Comment.Text>
    } else {
        return <></>;
    }
}