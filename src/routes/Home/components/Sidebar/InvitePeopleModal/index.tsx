import React from 'react'
import gql from "graphql-tag";
import { Formik, FormikErrors, FormikValues } from "formik";
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { createTeamMemberSchema } from "../../../../../constants/validationSchema"
import { InvitePeopleModalView } from "./InvitePeopleModalView"
import { TEAM_HOME_ROUTE } from '../../../../../constants/routes';
import { TeamsArray } from '../../../../../constants/types/team';
import { teamMembersQuery } from '../../../../../graphql/team';
import { findIndex, cloneDeep } from 'lodash';

const createTeamMemberMutation = gql`
  mutation CreateTeamMembe($email: String!, $teamId: Int!) {
    createTeamMember(email: $email, teamId: $teamId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

interface Props {
    teamId: number;
    open: boolean;
    onClose: () => void;
}

const InvitePeopleModal: React.FC<Props> = ({ open, onClose, teamId }) => {

    const history = useHistory();
    const [createTeamMember] = useMutation(createTeamMemberMutation);

    return (
        <>
            <Formik
                initialValues={{
                    email: "",
                }}
                validationSchema={createTeamMemberSchema}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const { data } = await createTeamMember({
                        variables: {
                            teamId,
                            email: values.email,
                        }, refetchQueries: [{ query: teamMembersQuery, variables: { teamId } }]
                    });

                    const { ok, errors } = data.createTeamMember;

                    if (ok) {
                        history.push(`${TEAM_HOME_ROUTE}/${teamId}`);
                        onClose();
                        setSubmitting(false);
                    } else {
                        const err: FormikErrors<FormikValues> = {};
                        errors.forEach(({ path, message }: FormikValues) => {
                            err[path] = message;
                        });
                        setErrors(err);
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, submitForm, resetForm }) => (
                    <InvitePeopleModalView
                        open={open}
                        onClose={onClose}
                        isSubmitting={isSubmitting}
                        submitForm={submitForm}
                        resetForm={resetForm}
                    />
                )}
            </Formik>
        </>
    );
}

export default InvitePeopleModal