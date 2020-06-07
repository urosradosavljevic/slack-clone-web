import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks';

import { channelMessagesQuery } from '../../../../graphql/message';
import { newChannelMessageSubscription } from '../../../../graphql/message';
import { ChannelMessagesView } from './ChannelMessagesView';

interface Props {
    channelId: number;
}

const ChannelMessages: React.FC<Props> = ({ channelId }) => {

    const { loading, data, subscribeToMore } = useQuery(channelMessagesQuery, {
        variables: { channelId },
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
        <ChannelMessagesView messages={data.channelMessages} />
    );
}

export default ChannelMessages;