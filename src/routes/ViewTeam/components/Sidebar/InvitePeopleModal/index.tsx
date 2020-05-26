import React from 'react'
import gql from "graphql-tag";
import { Formik, FormikErrors, FormikValues } from "formik";
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import { createTeamMemberSchema } from "../../../../../constants/validationSchema"
import { InvitePeopleModalView } from "./InvitePeopleModalView"

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
                        }
                    });

                    const { ok, errors } = data.createTeamMember;

                    console.log("submiting form", ok, errors)

                    if (ok) {
                        history.push(`/view-team/${teamId}`);
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
                {({ isSubmitting, submitForm }) => (
                    <InvitePeopleModalView
                        open={open}
                        onClose={onClose}
                        isSubmitting={isSubmitting}
                        submitForm={submitForm}
                    />
                )}
            </Formik>
        </>
    );
}

export default InvitePeopleModal