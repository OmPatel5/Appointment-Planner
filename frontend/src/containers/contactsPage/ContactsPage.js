import React, { useState, useEffect } from "react";
import {ContactForm} from '../../components/contactForm/ContactForm';
import { TileList } from '../../components/tileList/TileList'
import {useAuth} from '../../contexts/AuthContext';
import { Button, Alert } from 'react-bootstrap'; 
import { useHistory } from "react-router";
import { Switch, Route, Redirect, NavLink, Link } from "react-router-dom";
import ContactTileList from "../../components/contactTileList/ContactTileList";
import { current } from "@reduxjs/toolkit";



export const ContactsPage = (props) => {
  /*
  Define state variables for 
  contact info and duplicate check
  */


  

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const [error, setError] = useState("");

  const {firstname, lastname, logout, currentUser} = useAuth();

  const history = useHistory();

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const [name, phoneNumber, email] = [e.target[0].value, e.target[1].value, e.target[2].value]
    
    const contacts = props.contacts;
    const names = contacts.map(contact => {
      if (contact.uid === currentUser.uid) {
        return contact.name;
      }
    });

    if (!names.includes(name)) {
      props.addContact(name, phoneNumber, email, currentUser);
      setName('')
      setPhoneNumber('')
      setEmail('')
    }
    else {
      setError('Cannot add Contact with same name')
    }
    /*
    Add contact info and clear data
    if the contact name is not a duplicate
    */
  };
  async function handleLogout() {
    setError('');

    try {
      await logout();
      history.push('/login')
    } catch(error) {
      setError(error)
    }
  }


  /*
  Using hooks, check for contact name in the 
  contacts array variable in props
  */

  return (
    <div>
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="">Appointment Planner</Link>
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="/contacts">Contacts</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/appointments">Appointments</Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Logged in as: {firstname} {lastname}</a>
              </li>
              <div className="d-flex">
                <Button className="navbar-brand" variant='link' onClick={handleLogout}>Log Out</Button>
              </div>
            </ul>
        </div>
      </nav>
      <section className="contactFormSection" style={{marginTop: '100px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: "5px", padding: " 50px 50px 70px"}}>
        <h2>Add Contact</h2> 
        <ContactForm 
          name={name} 
          setName={setName} 
          phoneNumber={phoneNumber} 
          setPhoneNumber={setPhoneNumber} 
          email={email} 
          setEmail={setEmail} 
          handleSubmit={handleSubmit} />
        {error && <Alert variant="danger" style={{marginTop: "50px"}}>{error}</Alert>}
      </section>
      <hr />
      <section className='contactTiles' style={{background: 'rgba(0, 0, 0, 0.5)', padding: " 50px 50px 70px", borderRadius: "5px"}}>
        <h2>Contacts</h2>
        <ContactTileList />
        
      </section>
    </div>
  );
};
