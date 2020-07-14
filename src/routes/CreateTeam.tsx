import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, FormikErrors, FormikValues } from "formik";
import { Container, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react";
import gql from "graphql-tag";

// import { useLoginStoreContext } from "../stores/LoginStore";
import { createTeamSchema } from "../constants/validationSchema";
import { TextInput } from "../shared-components/TextInput";
import { TEAM_HOME_ROUTE } from "../constants/routes";
import { createTeamQuery } from "../graphql/team";
import { meQuery } from "../graphql/user";
import { TeamsArray } from "../constants/types/team";
import { cloneDeep } from "lodash";


interface Props { }

export const CreateTeam: React.FC<Props> = observer(() => {
  // const loginStore = useLoginStoreContext();
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
            update: (store, { data: { createTeam } }) => {
              const data: { me: TeamsArray } | null = store.readQuery({ query: meQuery });
              console.log("me query data:", data)
              console.log("createTeam data:", createTeam)
              if (data && createTeam.team) {
                const storeData = cloneDeep(data)
                storeData.me.teams.push(createTeam.team);
                store.writeQuery({ query: meQuery, data: storeData });
              }
            }
          });

          const { ok, errors, team } = data.createTeam;

          if (ok) {
            history.push(`${TEAM_HOME_ROUTE}/${team.id}/1`);
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
