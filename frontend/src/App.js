import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import Axios from "axios";
import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";
import { RegisterPage } from "./containers/RegisterPage/registerPage"
import { LoginPage } from "./containers/LoginPage/loginPage";

import {Container} from 'react-bootstrap'
import { AuthProvider } from "./contexts/AuthContext";
import { PrivateRoute } from "./components/Private Routes/PrivateRoute";

import { useAuth } from "./contexts/AuthContext";


const _ = require('lodash'); 


function App() {
  /*
  Define state variables for 
  contacts and appointments 
  */

  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contactID, setContactID] = useState([])
  const [appointmentID, setAppointmentID] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [isEditContact, setIsEditContact] = useState({});
  const [userID, setUserID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');



  useEffect(() => {
    Axios.get("https://appointment-planner-api.onrender.com/getContact").then((response) => {
      const existingContacts = response.data.map((contact) => {
        return {
          uid: contact.uid, 
          name: contact.name, 
          phoneNumber: contact.phone, 
          email: contact.email
        }
      })
      const contactIDs = response.data.map((contact) => {
        return contact._id;
      })
      setContacts(existingContacts);
      setContactID(contactIDs);
    })

    Axios.get("https://appointment-planner-api.onrender.com/getAppointments").then((response) => {
      const existingAppointments = response.data.map((appointment) => {
        return {
          uid: appointment.uid, 
          title: appointment.title,
          contact: appointment.contact, 
          date: appointment.date, 
          time: appointment.time 
        }
      })
      const appointmentIDs = response.data.map((appointment) => {
        return appointment._id;
      })
      setAppointments(existingAppointments);
      setAppointmentID(appointmentIDs);
    })
  }, [])

  const addContact = (name, phoneNumber, email, currentUser) => {
    Axios.post("https://appointment-planner-api.onrender.com/createContact", {
      uid: currentUser.uid,
      name: name,
      phone: phoneNumber, 
      email: email
    }).then((response) => {
      console.log('')
    })
    setContacts(prevContacts => [...prevContacts, {uid: currentUser.uid, name: name, phoneNumber: phoneNumber, email: email}])
  }

  const addAppointment = async (title, contact, date, time, currentUser) => {
    await Axios.post("https://appointment-planner-api.onrender.com/createAppointment", {
      uid: currentUser.uid,
      title: title,
      contact: contact, 
      date: date, 
      time: time 
    }).then((response) => {
      console.log('')
    })

    setAppointments(prevAppointments => [...prevAppointments, {uid: currentUser.uid, title: title, date: date, time: time, contact: contact}])
    
  }

  const removeContact = (contact) => {
    const index = contacts.indexOf(contact)
    const id = contactID[index];

    Axios.delete(`https://appointment-planner-api.onrender.com/deleteContact/${id}`)



    setContacts(contacts.filter(contactInList => !_.isEqual(contact, contactInList)));
  }

  const removeAppointment = (appointment) => {
    const index = appointments.indexOf(appointment)
    const id = appointmentID[index];

    Axios.delete(`https://appointment-planner-api.onrender.com/deleteAppointment/${id}`)

    const newList = appointments.filter(appointmentInList => !_.isEqual(appointment, appointmentInList));
    setAppointments(newList);
  }

  const onSubmit = (e, contact, from, currentUser) => {
    // let from = 'APPOINTMENT';
    e.preventDefault();
    let newObj;
    if (from === 'contact') {
      let [name, phoneNumber, email] = [e.target[0].value, e.target[1].value, e.target[2].value];
      newObj = {
        uid: currentUser.uid,
        name: name, 
        phoneNumber: phoneNumber,
        email: email
      }
    }
    else {
      let [title, date, time, contact] = [e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value];
      newObj = {
        uid: currentUser.uid,
        title: title, 
        date: date,
        time: time, 
        contact: contact
      }
    }
    const index = from === 'contact' ? contacts.indexOf(contact) : appointments.indexOf(contact)
    from === 'contact' ? contacts[index] = newObj : appointments[index] = newObj;

    if (from === 'contact') {
      Axios.put("https://appointment-planner-api.onrender.com/updateContact", {
        id: contactID[index], 
        newObject: newObj
      })
    } else {
      Axios.put("https://appointment-planner-api.onrender.com/updateAppointment", {
        id: appointmentID[index], 
        newObject: newObj
      })
    }
    
    console.log('eeeeeee');

    setIsEdit(false);
  }


  const ROUTES = {
    CONTACTS: "/contacts",
    APPOINTMENTS: "/appointments",
  };

  /*
  Implement functions to add data to
  contacts and appointments
  */


  return (
        <main>
          <AuthProvider>
            <Switch>
              
              {/* <Route exact path="/"> */}
                {/* <Redirect to={'/login'}/> */}
              {/* </Route> */}

              <Route path="/register">
                <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                  <div className="w-100" style={{maxWidth: '400px'}}>
                    <RegisterPage/>
                  </div>
                </Container> 
              </Route>

              <Route path='/login'>
                <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                  <div className="w-100" style={{maxWidth: '400px'}}>
                    <LoginPage /> 
                  </div>
                </Container> 
              </Route>

              <Route path='https://appointment-planner.onrender.com/login'>
                <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
                  <div className="w-100" style={{maxWidth: '400px'}}>
                    <LoginPage /> 
                  </div>
                </Container> 
              </Route>
              
              <PrivateRoute path={ROUTES.CONTACTS}>
                {/* Add props to ContactsPage */}
                <Container className="">
                  <div className="">
                    <ContactsPage onSubmit={onSubmit} isEdit={isEdit} setIsEdit={setIsEdit} contacts={contacts} setContacts={setContacts} addContact={addContact} removeContact={removeContact} isEditContact={isEditContact} setIsEditContact={setIsEditContact} firstName={firstName} lastName={lastName}/>
                  </div>
                </Container> 
              </PrivateRoute>
              <PrivateRoute path={ROUTES.APPOINTMENTS}>
                {/* Add props to AppointmentsPage */}
                <Container className="">
                  <div className="">
                    <AppointmentsPage onSubmit={onSubmit} appointments={appointments} contacts={contacts} addAppointment={addAppointment} isEdit={isEdit} setIsEdit={setIsEdit} removeAppointment={removeAppointment} isEditContact={isEditContact} setIsEditContact={setIsEditContact}/>
                  </div>
                </Container>
              </PrivateRoute>
            </Switch>
          </AuthProvider>
        </main>
  );
}


export default App;
