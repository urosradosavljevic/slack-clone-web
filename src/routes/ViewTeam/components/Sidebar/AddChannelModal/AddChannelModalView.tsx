import React from "react";
import { Modal, Button, FormField } from "semantic-ui-react";
import { Form, Field } from "formik";
import { TextInput } from "../../../../../shared-components/TextInput";
import { RadioToggle } from "../../../../../shared-components/RadioToggle";

interface Props {
  open: boolean;
  onClose: () => void;
  submitForm: () => void;
  isSubmitting: boolean;
}

export const AddChannelModalView: React.FC<Props> = ({
  open,
  onClose,
  isSubmitting,
  submitForm,
}) => {
  return (

    <Modal
      as={Form}
      className="ui form"
      onSubmit={(e: Event) => { e.preventDefault(); submitForm(); }}
      open={open}
      onClose={onClose}
      basic
      size="small"
    >
      <Modal.Header content="Add channel" />
      <Modal.Content>
        <Field
          fluid
          inverted
          name="name"
          title="Name"
          placeholder="front desk"
          component={TextInput}
        />
        <Field
          name="public"
          title="Public"
          type="checkbox"
          inactiveTitle="Private"
          component={RadioToggle}
        />
      </Modal.Content>
      <Modal.Actions>
        <FormField>
          <Button type="button" inverted onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" inverted loading={isSubmitting}>
            Create Channel
          </Button>
        </FormField>
      </Modal.Actions>
    </Modal>
  );
};
