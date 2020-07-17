import React from 'react'
import { Formik, Form } from "formik";

import { SendMessageView } from './SendMessageView';
import { Button } from 'semantic-ui-react';
import { FileUpload } from "../FileUpload";
import styled from 'styled-components';


interface Props {
    submit: (values: { text: string },
        setSubmitting: (arg0: boolean) => void) => void;
    placeholder: string;
    channelId?: number;
}

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
  display: grid;
  grid-template-columns: 50px 1fr;
`;


const SendMessage: React.FC<Props> = ({ submit, placeholder, channelId }) => {

    return (
        <>
            <SendMessageWrapper>
                <FileUpload button={true} channelId={channelId}>
                    <Button icon='plus' />
                </FileUpload>
                <Formik
                    initialValues={{
                        text: "",
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        submit(values, setSubmitting);
                    }}
                >
                    {({ isSubmitting, submitForm, values, setFieldValue, handleSubmit }) => (
                        <Form>
                            <SendMessageView
                                values={values}
                                submitForm={submitForm}
                                channelId={channelId}
                                placeholder={placeholder}
                                setFieldValue={setFieldValue}
                                isSubmitting={isSubmitting}
                            />
                        </Form>
                    )}
                </Formik>
            </SendMessageWrapper>
        </>
    );
}

export default SendMessage;