import React from "react";
import { useMutation } from "@apollo/react-hooks";

import { AddDirectChannelModalView } from "./AddDirectChannelModalView";
import { getOrCreateDMChannelMutation } from "../../../../../graphql/channel";
import { Formik, FormikErrors, FormikValues } from "formik";
import { TeamsArray } from "../../../../../constants/types/team";
import { meQuery } from "../../../../../graphql/user";
import { findIndex } from "lodash";
import { TEAM_HOME_ROUTE } from "../../../../../constants/routes";
import { useHistory } from "react-router-dom";

interface Props {
  teamId: number;
  myId: number;
  open: boolean;
  onClose: () => void;
}

const AddDirectChannelModal: React.FC<Props> = ({ open, onClose, teamId, myId }) => {
  const history = useHistory();
  const [getOrCreateDMChannel] = useMutation(getOrCreateDMChannelMutation);

  return (
    <Formik
      initialValues={{
        members: [],
      }}
      onSubmit={async (values, { setSubmitting, setErrors }) => {

        const { data } = await getOrCreateDMChannel({
          variables: {
            members: values.members,
            teamId: teamId,
          },
          update: (store, { data: { getOrCreateDMChannel } }) => {

            const { ok, channel } = getOrCreateDMChannel;

            if (!ok) {
              return;
            }

            const data: { me: TeamsArray } | null = store.readQuery({
              query: meQuery
            });

            if (data) {
              const teamIdx = findIndex(data.me.teams, ["id", teamId]);
              const notAlreadyExists = data.me.teams[teamIdx].channels.every(c => c.id !== channel.id)
              if (notAlreadyExists) {
                data.me.teams[teamIdx].channels.push(channel);
                store.writeQuery({ query: meQuery, data });
              }
            }
          },
        });

        const { ok, errors, channel } = data.getOrCreateDMChannel;

        if (ok) {
          history.push(`${TEAM_HOME_ROUTE}/${teamId}/${channel.id}`);
          setSubmitting(false);
          onClose();
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
      {({ isSubmitting, submitForm, resetForm, values, setFieldValue }) => (
        <AddDirectChannelModalView
          values={values}
          teamId={teamId}
          open={open}
          myId={myId}
          isSubmitting={isSubmitting}
          onClose={onClose}
          submitForm={submitForm}
          resetForm={resetForm}
          setFieldValue={setFieldValue}
        />
      )}
    </Formik>
  )
}

export default AddDirectChannelModal;
