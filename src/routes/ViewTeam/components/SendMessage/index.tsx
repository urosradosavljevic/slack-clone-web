import React from 'react'
import gql from "graphql-tag";
import { Formik, FormikErrors, FormikValues, Form } from "formik";
import { useMutation } from '@apollo/react-hooks';

import { SendMessageView } from './SendMessageView';

const sendMessageMutation = gql`
  mutation SendMessage($channelId: Int!, $text: String!) {
    sendMessage(channelId: $channelId, text: $text){
      ok
      errors {
        path
        message
      }
    }
  }
`;

interface Props {
    channelId: number;
    channelName: string;
}

const SendMessage: React.FC<Props> = ({ channelId, channelName, }) => {
    const [sendMessage] = useMutation(sendMessageMutation);

    return (
        <>
            <Formik
                initialValues={{
                    text: "",
                }}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                    const { data } = await sendMessage({
                        variables: {
                            channelId,
                            text: values.text,
                        }
                    });

                    const { ok, errors } = data.sendMessage;

                    if (ok) {
                        setSubmitting(false);
                        values.text = ""
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
                    <Form>
                        <SendMessageView channelName={channelName} />
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default SendMessage;