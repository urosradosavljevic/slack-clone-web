import React from 'react'
import { Dropdown } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import { teamMembersQuery } from '../../../../../graphql/team';

interface Props {
    teamId: number;
    field: string;
    placeholder: string;
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

export const MultiSelectUsers: React.FC<Props> = ({ teamId, myId, setFieldValue, field, members, placeholder }) => {

    const { loading, data } = useQuery<TeamMembersResponse>(teamMembersQuery, {
        variables: { teamId }
    });
    if (!loading && data) {
        return (
            <Dropdown
                placeholder={placeholder}
                fluid
                multiple
                search
                selection
                value={members}
                onChange={(e, { value }) => setFieldValue(field, value)}
                options={data.teamMembers.filter(tm => tm.id !== myId).map(tm => ({ key: tm.id, value: tm.id, text: tm.username }))}
            />);

    }
    return null
}