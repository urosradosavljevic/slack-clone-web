import React from "react";
import { Modal, Button, FormField } from "semantic-ui-react";
import { Form, Field } from "formik";
import { TextInput } from "../../../../../shared-components/TextInput";
import { RadioToggle } from "../../../../../shared-components/RadioToggle";
import { MultiSelectUsers } from "./MultiSelectUsers";

interface Props {
  open: boolean;
  values: {
    name: string;
    public: boolean;
    privateMembers: never[];
  };
  teamId: number;
  myId: number;
  onClose: () => void;
  submitForm: () => void;
  resetForm: () => void;
  setFieldValue: (field: string, value: any) => void;
  isSubmitting: boolean;
}

export const AddChannelModalView: React.FC<Props> = ({
  open,
  isSubmitting,
  values,
  myId,
  teamId,
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
      <Modal.Header content="Add channel" />
      <Modal.Content>
        <Field
          fluid
          inverted
          name="name"
          placeholder="front desk"
          component={TextInput}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          Private
        <Field
            style={{ paddingLeft: "5px" }}
            name="public"
            type="checkbox"
            inactiveTitle=""
            setFieldValue={setFieldValue}
            component={RadioToggle}
          />
        </div>
        {!values.public &&
          <MultiSelectUsers
            placeholder={"Select users to add to channel"}
            field={"privateMembers"}
            myId={myId}
            setFieldValue={setFieldValue}
            members={values.privateMembers}
            teamId={teamId}
          />}
      </Modal.Content>
      <Modal.Actions>
        <FormField>
          <Button type="button" inverted onClick={() => { onClose(); resetForm(); }}>
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
