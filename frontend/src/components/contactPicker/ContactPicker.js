import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const ContactPicker = (props) => {
  const {currentUser} = useAuth()

  return (
    <>
      {props.isTile ? '' : <label>Pick a Contact</label>}
      <select onChange={props.isTile ? props.handleOnchangeEdit : props.onChangeEvent} required>
        <option value="" selected="selected">Select an Option</option>    
        {
          props.contacts.map((contact, index) => (
            contact.uid === currentUser.uid ? <option value={contact.name} key={index}>{contact.name}</option> : <></>
          ))
        }
      </select>
    </>
  );
};
