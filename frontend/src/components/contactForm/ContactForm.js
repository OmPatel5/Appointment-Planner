import React from "react";
import { useAccordionButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addContact, addContactToDB, createContact, selectContacts } from "../../containers/contactsPage/contactsSlice";
import { useAuth } from "../../contexts/AuthContext";

export const ContactForm = ({name,setName,phoneNumber,setPhoneNumber,email,setEmail,handleSubmit}) => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const {currentUser} = useAuth();
  
  const onFormSubmit = async (e) => {
    e.preventDefault();
    const [name, phoneNumber, email] = [e.target[0].value, e.target[1].value, e.target[2].value]
    console.log(name)
    
    const names = contacts.map(contact => {
      if (contact.uid === currentUser.uid) {
        return contact.name;
      }
    });

    if (!names.includes(name)) {
      console.log(currentUser.uid)
      dispatch(addContactToDB({name: name, 
        phoneNumber: phoneNumber, 
        email:email, 
        uid: currentUser.uid
      }))
      dispatch(addContact({
        name,
        phoneNumber,
        email,
        uid: currentUser.uid,
      }))
    }
    else {
      alert('Cannot add Contact with same name')
    }
  }



  return (
    <form onSubmit={onFormSubmit}>
      <label>Name</label><input type='text' placeholder='Name' required/>
      <label>Phone Number</label><input type='text' placeholder='xxx-xxx-xxxx' pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  required/>
      <label>Email</label><input type='text'  placeholder='exEmail@gmail.com' pattern="^\S+@\S+$"required/>
      <input type="submit" />
    </form>
  );
};
