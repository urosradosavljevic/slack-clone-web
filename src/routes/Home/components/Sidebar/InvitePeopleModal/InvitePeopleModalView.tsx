import React from "react";
import { Modal, Button, FormField } from "semantic-ui-react";
import { Form, Field } from "formik";
import { TextInput } from "../../../../../shared-components/TextInput";

interface Props {
  open: boolean;
  onClose: () => void;
  submitForm: () => void;
  resetForm: () => void;
  isSubmitting: boolean;
}

export const InvitePeopleModalView: React.FC<Props> = ({
  open,
  onClose,
  isSubmitting,
  submitForm,
  resetForm
}) => {
  return (

    <Modal
      as={Form}
      className="ui form"
      onSubmit={(e: Event) => { e.preventDefault(); submitForm(); }}
      open={open}
      onClose={() => { onClose(); resetForm(); }}
      basic
      size="small"
    >
      <Modal.Header content="Add people to your team" />
      <Modal.Content>
        <Field
          fluid
          inverted
          name="email"
          title="Email"
          placeholder="john@mail.com"
          component={TextInput}
        />
      </Modal.Content>
      <Modal.Actions>
        <FormField>
          <Button type="button" inverted onClick={() => { onClose(); resetForm(); }}>
            Cancel
          </Button>
          <Button type="submit" inverted loading={isSubmitting}>
            Create Team Member
          </Button>
        </FormField>
      </Modal.Actions>
    </Modal>
  );
};
