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
import {useDispatch, useSelector} from 'react-redux';
import { loadContacts, selectContacts } from "./containers/contactsPage/contactsSlice";



const _ = require('lodash'); 


function App() {
  /*

  Define state variables for 
  contacts and appointments 
  */



  const dispatch = useDispatch();

  

  const testContacts = useSelector(selectContacts);


  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contactID, setContactID] = useState([])
  const [appointmentID, setAppointmentID] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [isEditContact, setIsEditContact] = useState({});
  const [userID, setUserID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');



  


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
                    <ContactsPage onSubmit={''} isEdit={isEdit} setIsEdit={setIsEdit} contacts={contacts} setContacts={setContacts} addContact={''} removeContact={''} isEditContact={isEditContact} setIsEditContact={setIsEditContact} firstName={firstName} lastName={lastName}/>
                  </div>
                </Container> 
              </PrivateRoute>
              <PrivateRoute path={ROUTES.APPOINTMENTS}>
                {/* Add props to AppointmentsPage */}
                <Container className="">
                  <div className="">
                    <AppointmentsPage onSubmit={'onSubmit'} appointments={appointments} contacts={contacts} addAppointment={'addAppointment'} isEdit={isEdit} setIsEdit={setIsEdit} removeAppointment={'removeAppointment'} isEditContact={isEditContact} setIsEditContact={setIsEditContact}/>
                  </div>
                </Container>
              </PrivateRoute>
            </Switch>
          </AuthProvider>
        </main>
  );
}


export default App;
