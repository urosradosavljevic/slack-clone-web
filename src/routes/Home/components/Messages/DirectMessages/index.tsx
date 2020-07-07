import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';

import { directMessagesQuery, newDirectMessageSubscription, sendDirectMessageMutation } from '../../../../../graphql/directMessage';
import SendMessage from '../../SendMessage';
import { DirectMessagesView } from '../DirectMessagesView';

interface Props {
    user: number;
    teamId: number;
}

const DirectMessages: React.FC<Props> = ({ teamId, user }) => {
    const [sendDirectMessage] = useMutation(sendDirectMessageMutation);

    // const { loading, data } = useQuery(directMessagesQuery, {
    const { loading, data, subscribeToMore } = useQuery(directMessagesQuery, {
        variables: { receiverId: user, teamId },
        fetchPolicy: 'network-only',
    })

    const submit = async (values: { text: string }, setSubmitting: (arg0: boolean) => void) => {
        const { data } = await sendDirectMessage({
            variables: {
                receiverId: user,
                teamId,
                text: values.text,
            }
        });

        const { ok, errors } = data.sendDirectMessage;

        if (ok) {
            setSubmitting(false);
            values.text = ""
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: newDirectMessageSubscription,
            variables: { receiverId: user, teamId },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData) {
                    return prev;
                }
                return {
                    ...prev,
                    channelMessages: [
                        ...prev.channelMessages,
                        subscriptionData.data.newChannelMessage
                    ]
                }
            }
        });
        return () => unsubscribe();
    });

    if (loading) {
        return null;
    }
    console.log("directmessages:", data)
    return (
        <>
            <DirectMessagesView messages={data.directMessages} />
            <SendMessage submit={submit} placeholder={"User"} />
        </>
    );
}

export default DirectMessages;