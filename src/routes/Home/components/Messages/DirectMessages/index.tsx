import React, { useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks';
import findIndex from "lodash/findIndex";
import cloneDeep from "lodash/cloneDeep";


import { directMessagesQuery, newDirectMessageSubscription, sendDirectMessageMutation } from '../../../../../graphql/directMessage';
import { meQuery } from "../../../../../graphql/user";
import { TeamsArray, Team } from "../../../../../constants/types/team";
import SendMessage from '../../SendMessage';
import { DirectMessagesView } from '../DirectMessagesView';

interface Props {
    userId: number;
    username: string;
    team: Team;
}

const DirectMessages: React.FC<Props> = ({ team, userId, username }) => {
    const [sendDirectMessage] = useMutation(sendDirectMessageMutation);

    const { loading, data, subscribeToMore } = useQuery(directMessagesQuery, {
        variables: { userId, teamId: team.id },
        fetchPolicy: 'network-only',
    })

    const submit = async (values: { text: string }, setSubmitting: (arg0: boolean) => void) => {
        const { data } = await sendDirectMessage({
            variables: {
                receiverId: userId,
                teamId: team.id,
                text: values.text,
            },
            update: (store) => {
                const data: { me: TeamsArray } | null = store.readQuery({ query: meQuery });
                if (data) {
                    const teamIdx = findIndex(data.me.teams, ["id", team.id]);
                    const notAlreadyThere = data.me.teams[teamIdx].directMessagedMembers.every(m => m.id !== userId);
                    console.log("notAlreadyThere", notAlreadyThere);
                    if (notAlreadyThere) {
                        const storeData = cloneDeep(data)
                        storeData.me.teams[teamIdx].directMessagedMembers.push({
                            id: userId,
                            username,
                            __typename: 'User',
                        });
                        store.writeQuery({ query: meQuery, data: storeData });
                    }
                }
            },
        });

        const { ok } = data.sendDirectMessage;

        if (ok) {
            setSubmitting(false);
            values.text = ""
            setSubmitting(false);
        }
    }

    useEffect(() => {
        const unsubscribe = subscribeToMore({
            document: newDirectMessageSubscription,
            variables: { userId, teamId: team.id },
            updateQuery: (prev, { subscriptionData }) => {

                if (!subscriptionData) {
                    return prev;
                }
                return {
                    ...prev,
                    directMessages: [
                        ...prev.directMessages,
                        subscriptionData.data.newDirectMessage
                    ]
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
            <DirectMessagesView messages={data.directMessages} />
            <SendMessage submit={submit} placeholder={username} />
        </>
    );
}

export default DirectMessages;