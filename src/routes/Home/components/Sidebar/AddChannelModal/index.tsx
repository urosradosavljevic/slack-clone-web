import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Formik, FormikErrors, FormikValues } from "formik";
import findIndex from "lodash/findIndex";

import { createChannelSchema } from "../../../../../constants/validationSchema";
import { AddChannelModalView } from "./AddChannelModalView";
import { meQuery } from "../../../../../graphql/user";
import { createChannelMutation } from "../../../../../graphql/channel";
import { TeamsArray } from "../../../../../constants/types/team";
import { TEAM_HOME_ROUTE } from "../../../../../constants/routes";

interface Props {
  teamId: number;
  myId: number;
  open: boolean;
  onClose: () => void;
}
const AddChannelModal: React.FC<Props> = ({ teamId, myId, open, onClose }) => {
  const history = useHistory();
  const [createChannel] = useMutation(createChannelMutation);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          public: true,
          privateMembers: [],
        }}
        validationSchema={createChannelSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {

          const { data } = await createChannel({
            variables: {
              name: values.name,
              public: values.public,
              members: values.public ? [] : values.privateMembers,
              teamId: teamId,
            },
            update: (store, { data: { createChannel } }) => {

              const { ok, channel } = createChannel;

              if (!ok) {
                return;
              }

              const data: { me: TeamsArray } | null = store.readQuery({
                query: meQuery
              });

              if (data) {
                const teamIdx = findIndex(data.me.teams, ["id", teamId]);
                data.me.teams[teamIdx].channels.push(channel);
                store.writeQuery({ query: meQuery, data });
              }
            },
          });

          const { ok, errors, channel } = data.createChannel;

          if (ok) {
            setSubmitting(false);
            onClose();
            history.push(`${TEAM_HOME_ROUTE}/${teamId}/${channel.id}`);
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
          <AddChannelModalView
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
    </>
  );
}

export default AddChannelModal;
