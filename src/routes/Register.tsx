import React from "react";
import { Formik, Form, Field, FormikErrors, FormikValues } from "formik";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import { useHistory } from "react-router-dom";
import { Container, Header, Button } from "semantic-ui-react";
import { TextInput } from "../shared-components/TextInput";
import { registerSchema } from "../constants/validationSchema";
import { TEAM_ROUTE } from "../constants/routes";

const registerQuery = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
interface Props { }

export const Register: React.FC<Props> = () => {
  const history = useHistory();

  const [register] = useMutation(registerQuery);

  return (
    <Container text>
      <Header as="h2">Register</Header>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirm: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { data } = await register({
            variables: {
              username: values.username,
              email: values.email,
              password: values.password,
            },
          });

          const { ok, errors } = data.register;

          if (ok) {
            history.push(TEAM_ROUTE);
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
              name="username"
              title="Full name"
              fluid
              placeholder="John Peters"
              component={TextInput}
            />
            <Field
              name="email"
              title="Email"
              fluid
              placeholder="john@mail.com"
              component={TextInput}
            />
            <Field
              name="password"
              title="Password"
              type="password"
              fluid
              placeholder="*******"
              component={TextInput}
            />
            <Field
              name="confirm"
              title="Confirm password"
              type="password"
              fluid
              placeholder="*******"
              component={TextInput}
            />
            <Button type="submit" basic fluid loading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};
