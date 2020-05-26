import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Formik, FormikErrors, FormikValues } from "formik";
import gql from "graphql-tag";
import findIndex from "lodash/findIndex";

import { createChannelSchema } from "../../../../../constants/validationSchema";
import { AddChannelModalView } from "./AddChannelModalView";
import { allTeamsQuery } from "../../../../../graphql/team";
import { AllTeamsArray } from "../../../../../constants/types";

const createChannelMutation = gql`
  mutation CreateChannel($name: String!, $teamId: Int!, $public: Boolean) {
    createChannel(name: $name, teamId: $teamId, public: $public) {
      ok
      channel {
        id
        name
      }
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

              const data = store.readQuery<AllTeamsArray | null>({
                query: allTeamsQuery
              });

              if (data) {
                const teamIdx = findIndex(data.allTeams, ["id", teamId]);
                data.allTeams[teamIdx].channels.push(channel);
              }
            },
          });

          const { ok, errors, channel } = data.createChannel;

          if (ok) {
            history.push(`/view-team/${teamId}/${channel.id}`);
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
