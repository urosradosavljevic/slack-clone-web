import React from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, FormikErrors, FormikValues } from "formik";
import { Container, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react";

import { loginSchema } from "../constants/validationSchema";
import { useLoginStoreContext } from "../stores/LoginStore";
import { TextInput } from "../shared-components/TextInput";

const loginQuery = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;
interface Props {}
export const Login: React.FC<Props> = observer(() => {
  const loginStore = useLoginStoreContext();
  const history = useHistory();
  const [login] = useMutation(loginQuery);

  return (
    <Container text>
      <Header as="h2">Login</Header>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const { data } = await login({
            variables: {
              email: values.email,
              password: values.password,
            },
          });

          const { ok, errors, token, refreshToken } = data.login;

          if (ok) {
            history.push("/");
            localStorage.setItem("token", token);
            localStorage.setItem("refreshToken", refreshToken);
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
              name="email"
              title="Email"
              fluid
              placeholder="john@mafil.com"
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
            <Button type="submit" basic fluid loading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
});
