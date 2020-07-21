import React, { useEffect, useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';

import { channelMessagesQuery } from '../../../../../graphql/message';
import { sendMessageMutation, newChannelMessageSubscription } from '../../../../../graphql/message';
import { MessagesView } from '../MessagesView';
import SendMessage from '../../SendMessage';
import MessagesWrapper from '../MessagesWrapper';

interface Props {
    channelId: number;
    channelName: string;
}

const ChannelMessages: React.FC<Props> = ({ channelId, channelName }) => {
    const [sendMessage] = useMutation(sendMessageMutation);
    const [hasMoreMessages, setHasMoreMessages] = useState<boolean>(true);
    const [loadingMoreMessages, setLoadingMoreMessages] = useState<boolean>(false);
    const scrollerRef = useRef<HTMLDivElement>(null)

    const { loading, data, subscribeToMore, fetchMore } = useQuery(channelMessagesQuery, {
        variables: { cursor: '', channelId },
        fetchPolicy: 'network-only',
    })

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

    const handleScroll = async () => {
        if (!hasMoreMessages || loadingMoreMessages) return;
        if (scrollerRef.current && scrollerRef.current.scrollTop < 50) {
            const prevHeight = scrollerRef.current.scrollHeight;

            await fetchMoreMessages(data.channelMessages[data.channelMessages.length - 1].createdAt)

            if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight - prevHeight
        }
    }

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
        }
    }

    const fetchMoreMessages = async (cursor: string) => {
        setLoadingMoreMessages(true)
        await fetchMore({
            variables: { cursor, channelId },
            updateQuery: (prev, { fetchMoreResult }) => {

                if (!fetchMoreResult) return prev;

                fetchMoreResult.channelMessages.length < 15 && setHasMoreMessages(false)
                return {
                    ...prev,
                    channelMessages: [...prev.channelMessages, ...fetchMoreResult.channelMessages]
                };
            }
        });
        setLoadingMoreMessages(false)
    }


    if (loading) {
        return null;
    }


    return (
        <>
            <MessagesWrapper
                ref={scrollerRef}
                onScroll={handleScroll}
            >
                <MessagesView
                    channelId={channelId}
                    messages={data.channelMessages}
                />
            </MessagesWrapper>
            <SendMessage submit={submit} channelId={channelId} placeholder={channelName} />
        </>
    );
}

export default ChannelMessages;