import React from "react";
import { Modal, Button, FormField, Input, Form } from "semantic-ui-react";
import Downshift from "downshift";
import { DownshiftList, DownshiftListItem } from "./DownshiftView"
import { User } from "../../../../../constants/types/user";
import { DIRECT_MESSAGE_HOME_ROUTE } from "../../../../../constants/routes";
import { useHistory } from "react-router-dom";


interface Props {
  open: boolean;
  teamId: number;
  users: Array<User>;
  onClose: () => void;
}

export const DirectUserModalView: React.FC<Props> = ({
  open,
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
        <Form.Field style={{ position:"relative" }} >
          <Downshift
            onChange={selection =>{
              history.push(`${DIRECT_MESSAGE_HOME_ROUTE}${teamId}/${selection.id}`)
              onClose();
            }}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              getRootProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem,
            }) => (
                <>
                  <label style={{ color: "white" }} {...getLabelProps()}>Enter a users username</label>
                  <div
                    style={{ display: 'inline-block', position:"relative", width: "100%" }}
                    {...getRootProps({ refKey: "" }, { suppressRefError: true })}
                  >
                    <input {...getInputProps({
                      placeholder: "johnmir"
                    })}
                    />
                  </div>
                  
                  <DownshiftList {...getMenuProps()}>
                    {isOpen
                      ? users
                        .filter(item => !inputValue || item.username.includes(inputValue))
                        .map((item, index) => (
                          <DownshiftListItem
                            {...getItemProps({
                              key: item.id,
                              index,
                              item,
                              style: {
                                backgroundColor:
                                  highlightedIndex === index ? 'lightgray' : 'white',
                                fontWeight: selectedItem === item ? 'bold' : 'normal',
                              },
                            })}
                          >
                            {item.username}
                          </DownshiftListItem>
                        ))
                      : null}
                  </DownshiftList>
                </>
              )}
          </Downshift>
        </Form.Field>
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

