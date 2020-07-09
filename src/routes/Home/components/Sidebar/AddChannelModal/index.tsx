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
  open: boolean;
  onClose: () => void;
}
const AddChannelModal: React.FC<Props> = ({ teamId, open, onClose }) => {
  const history = useHistory();
  const [createChannel] = useMutation(createChannelMutation);

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          public: false,
        }}
        validationSchema={createChannelSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { data } = await createChannel({
            variables: {
              name: values.name,
              public: values.public,
              teamId: teamId,
            },
            update: (store, { data: { createChannel } }) => {
              // updating cache, less api call 
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
        {({ isSubmitting, submitForm }) => (
          <AddChannelModalView
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

export default AddChannelModal;
