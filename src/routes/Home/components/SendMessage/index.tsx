import React from 'react'
import { Formik, Form } from "formik";

import { SendMessageView } from './SendMessageView';


interface Props {
    submit: (values: { text: string },
        setSubmitting: (arg0: boolean) => void) => void;
    placeholder: string;
}

const SendMessage: React.FC<Props> = ({ submit, placeholder }) => {

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
                        <SendMessageView placeholder={placeholder} />
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default SendMessage;