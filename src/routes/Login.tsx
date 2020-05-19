import React, { FC } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, FormikErrors, FormikValues } from "formik";
import { Container, Header, Button } from "semantic-ui-react";
import { observer, useObserver } from "mobx-react";

import { loginSchema } from "../constants/validationSchema";
import { useLoginStoreContext } from "../stores/LoginStore";
import { TextInput } from "../shared-components/TextInput";

const loginQuery = gql`
  mutation RegisterUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const Login = observer(() => {
  const loginStore = useLoginStoreContext();
  const history = useHistory();
  const [login] = useMutation(loginQuery);
  console.log("render");

  return (
    <Container text>
      <div>
        <p>{loginStore.email}</p>
        <p>{loginStore.password}</p>
        <button
          onClick={() => {
            console.log("opala");
            loginStore.email += " f";
          }}
        >
          @
        </button>
        <button
          onClick={() => {
            loginStore.password += " f";
          }}
        >
          pass
        </button>
      </div>
      <Header as="h2">Login</Header>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          // history.push("/");

          // const { data } = await login({
          //   variables: {
          //     email: values.email,
          //     password: values.password,
          //   },
          // });

          // const { ok, errors } = data.register;

          // if (ok) {
          //   history.push("/");
          // } else {
          //   const err: FormikErrors<FormikValues> = {};
          //   errors.forEach(({ path, message }: FormikValues) => {
          //     err[path] = message;
          //   });
          //   setErrors(err);
          // }

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
