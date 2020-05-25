import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, FormikErrors, FormikValues } from "formik";
import { Container, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import gql from "graphql-tag";

import { createTeamSchema } from "../constants/validationSchema";
import { useLoginStoreContext } from "../stores/LoginStore";
import { TextInput } from "../shared-components/TextInput";

const createTeamQuery = gql`
  mutation CreateTeam($name: String!) {
    createTeam(name: $name) {
      ok
      team {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

interface Props {}

export const CreateTeam: React.FC<Props> = observer(() => {
  const loginStore = useLoginStoreContext();
  const history = useHistory();
  const [createTeam] = useMutation(createTeamQuery);

  return (
    <Container text>
      <Header as="h2">Create a team</Header>
      <Formik
        initialValues={{
          name: "",
        }}
        validationSchema={createTeamSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { data } = await createTeam({
            variables: {
              name: values.name,
            },
          });

          const { ok, errors, team } = data.createTeam;

          if (ok) {
            history.push(`/view-team/${team.id}/0`);
          } else {
            const err: FormikErrors<FormikValues> = {};
            errors.forEach(({ path, message }: FormikValues) => {
              err[path] = message;
            });
            setErrors(err);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              name="name"
              title="Name"
              fluid
              placeholder="frontend-squad"
              component={TextInput}
            />
            <Button type="submit" basic fluid loading={isSubmitting}>
              Create Team
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
});
