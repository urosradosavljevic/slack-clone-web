import React, { useEffect, FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';

import { channelMessagesQuery } from '../../../../../graphql/message';
import { sendMessageMutation, newChannelMessageSubscription } from '../../../../../graphql/message';
import { MessagesView } from '../MessagesView';
import SendMessage from '../../SendMessage';

interface Props {
    channelId: number;
    channelName: string;
}

const ChannelMessages: React.FC<Props> = ({ channelId, channelName }) => {
    const [sendMessage] = useMutation(sendMessageMutation);

    const { loading, data, subscribeToMore } = useQuery(channelMessagesQuery, {
        variables: { channelId },
        fetchPolicy: 'network-only',
    })

    const submit = async (values: { text: string }, setSubmitting: (arg0: boolean) => void) => {
        const { data } = await sendMessage({
            variables: {
                channelId,
                text: values.text,
            }
        });

        const { ok } = data.sendMessage;

        if (ok) {
            setSubmitting(false);
            values.text = ""
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: newChannelMessageSubscription,
            variables: { channelId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) {
                    return prev;
                }
                return {
                    ...prev,
                    channelMessages: [...prev.channelMessages, subscriptionData.data.newChannelMessage]
                }
            }
        });
        return () => unsubscribe();
    });

    if (loading) {
        return null;
    }

    return (
        <>
            <MessagesView messages={data.channelMessages} />
            <SendMessage submit={submit} placeholder={channelName} />
        </>
    );
}

export default ChannelMessages;