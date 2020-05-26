import React from 'react'
import { Message, Container } from 'semantic-ui-react';

interface Props {
    errors: Array<string>;
}

export const Error: React.FC<Props> = ({ errors }) => {
    return (
        <Container text>
            <Message
                error
                header={errors.length >= 1 ? 'There was some errors' : 'There was some error'}
                list={errors}
            />

        </Container>
    );
} 