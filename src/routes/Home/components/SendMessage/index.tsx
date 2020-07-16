import React from 'react'
import { Formik, Form } from "formik";

import { SendMessageView } from './SendMessageView';


interface Props {
    submit: (values: { text: string },
        setSubmitting: (arg0: boolean) => void) => void;
    placeholder: string;
    channelId?: number;
}

const SendMessage: React.FC<Props> = ({ submit, placeholder, channelId }) => {

    return (
        <>
            <Formik
                initialValues={{
                    text: "",
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    submit(values, setSubmitting);
                }}
            >
                {({ isSubmitting, submitForm }) => (
                    <Form>
                        <SendMessageView channelId={channelId} placeholder={placeholder} />
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default SendMessage;