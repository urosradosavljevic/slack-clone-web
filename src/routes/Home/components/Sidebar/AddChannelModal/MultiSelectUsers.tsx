import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { teamMembersQuery } from '../../../../../graphql/team';

interface Props {
    teamId: number;
    myId: number;
    members: Array<number> | undefined;
    setFieldValue: (field: string, value: any) => void;
}

interface TeamMembersResponse {
    teamMembers: Array<{
        id: number;
        username: string;
    }>;
}

export const MultiSelectUsers: React.FC<Props> = ({ teamId, myId, setFieldValue, members }) => {

    const { loading, data } = useQuery<TeamMembersResponse>(teamMembersQuery, {
        variables: { teamId }
    });
    if (!loading && data) {
        return (
            <Dropdown
                placeholder='Users'
                fluid
                multiple
                search
                selection
                value={members}
                onChange={(e, { value }) => setFieldValue("privateMembers", value)}
                options={data.teamMembers.filter(tm => tm.id !== myId).map(tm => ({ key: tm.id, value: tm.id, text: tm.username }))}
            />);

    }
    return null
}