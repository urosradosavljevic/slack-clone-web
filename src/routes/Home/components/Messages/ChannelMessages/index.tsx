import React, { useEffect, useState } from 'react'
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
    const [hasMoreMessages, setHasMoreMessages] = useState(true)

    const { loading, data, subscribeToMore, fetchMore } = useQuery(channelMessagesQuery, {
        variables: { cursor: '', channelId },
        fetchPolicy: 'network-only',
    })

    const submit = async (values: { text: string }, setSubmitting: (arg0: boolean) => void) => {
        if (values.text === "") return;
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

    const fetchMoreMessages = async (cursor: string) => {
        fetchMore({
            variables: { cursor, channelId },
            updateQuery: (prev, { fetchMoreResult }) => {
                console.log("prev", prev)
                console.log("fetchMoreResult", fetchMoreResult)

                if (!fetchMoreResult) return prev;
                fetchMoreResult.channelMessages.length < 5 && setHasMoreMessages(false);
                return {
                    ...prev,
                    channelMessages: [...prev.channelMessages, ...fetchMoreResult.channelMessages]
                };
            }
        })
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
                    channelMessages: [subscriptionData.data.newChannelMessage, ...prev.channelMessages]
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
            <MessagesView
                fetchMoreMessages={fetchMoreMessages}
                hasMoreMessages={hasMoreMessages}
                channelId={channelId}
                messages={data.channelMessages}
            />
            <SendMessage submit={submit} channelId={channelId} placeholder={channelName} />
        </>
    );
}

export default ChannelMessages;