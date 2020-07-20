import React from "react";
import { Modal, Button, FormField } from "semantic-ui-react";
import { Form } from "formik";
import { MultiSelectUsers } from "../AddChannelModal/MultiSelectUsers";

interface Props {
  open: boolean;
  myId: number;
  teamId: number;
  values: {
    members: never[];
  };
  isSubmitting: boolean;
  setFieldValue: (field: string, value: any) => void;
  onClose: () => void;
  submitForm: () => void;
  resetForm: () => void;
}

export const AddDirectChannelModalView: React.FC<Props> = ({
  open,
  myId,
  values,
  teamId,
  isSubmitting,
  onClose,
  submitForm,
  setFieldValue,
  resetForm,
}) => {
  return (
    <Modal
      as={Form}
      className="ui form"
      onSubmit={(e: Event) => { e.preventDefault(); submitForm(); }}
      open={open}
      onClose={() => { resetForm(); onClose(); }}
      basic
      size="small"
    >
      <Modal.Header content="Search Users" />
      <Modal.Content>
        <MultiSelectUsers
          placeholder={"Select users to message"}
          field={"members"}
          myId={myId}
          setFieldValue={setFieldValue}
          members={values.members}
          teamId={teamId}
        />
      </Modal.Content>
      <Modal.Actions>
        <FormField>
          <Button type="button" inverted onClick={() => { onClose(); resetForm(); }}>
            Cancel
          </Button>
          <Button type="submit" inverted loading={isSubmitting}>
            Message Users
          </Button>
        </FormField>
      </Modal.Actions>
    </Modal>
  );
};

