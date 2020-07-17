import React from "react";
import { Modal, Button, FormField, Form, Dropdown } from "semantic-ui-react";
import { User } from "../../../../../constants/types/user";
import { DIRECT_MESSAGE_HOME_ROUTE } from "../../../../../constants/routes";
import { useHistory } from "react-router-dom";


interface Props {
  open: boolean;
  myId: number;
  teamId: number;
  users: Array<User>;
  onClose: () => void;
}

export const DirectUserModalView: React.FC<Props> = ({
  open,
  myId,
  onClose,
  users,
  teamId
}) => {
  const history = useHistory();
  return (
    <Modal
      as={Form}
      className="ui form"
      onSubmit={(e: Event) => { e.preventDefault(); }}
      open={open}
      onClose={onClose}
      basic
      size="small"
    >
      <Modal.Header content="Search Users" />
      <Modal.Content>
        <Dropdown
          placeholder='username'
          fluid
          search
          selection
          onChange={(e, { value }) => {
            history.push(`${DIRECT_MESSAGE_HOME_ROUTE}${teamId}/${value}`)
            onClose();
          }}
          options={users.filter(tm => tm.id !== myId).map(tm => ({ key: tm.id, value: tm.id, text: tm.username }))}
        />);
      </Modal.Content>
      <Modal.Actions>
        <FormField>
          <Button type="button" inverted onClick={onClose}>
            Cancel
          </Button>
        </FormField>
      </Modal.Actions>
    </Modal>
  );
};

