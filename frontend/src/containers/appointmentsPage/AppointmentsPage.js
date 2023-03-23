import React, { useState } from "react";
import { AppointmentForm } from "../../components/appointmentForm/AppointmentForm";
import { TileList } from "../../components/tileList/TileList";
import { NavLink, useHistory, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Alert } from 'react-bootstrap'; 
import AppointmentTileList from "../../components/appointmentTileList/AppointmentTileList";
import { selectContacts } from "../contactsPage/contactsSlice";
import { useSelector } from "react-redux";



const _ = require('lodash'); 


export const AppointmentsPage = (props) => {
  /*
  Define state variables for 
  appointment info
  */

  const [title, setTitle] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [twentyFourTime, setTwentyFourTime] = useState('');

  const [error, setError] = useState('');

  const history = useHistory();

  const {firstname, lastname, logout, currentUser} = useAuth();

  const contacts = useSelector(selectContacts);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(props.appointments)
    
    for (let appointment in props.appointments) {
      if (props.appointments[appointment].title === title) {
        alert('Appointment already Exists')
        setError('Appointment name already exists!')
        return;
      }
    }

    await props.addAppointment(title, contact, date, time, currentUser);
    setTitle(''); 
    setDate('')
    setTime('')
   
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

  return (
    <div>
      <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand">Appointment Planner</Link>
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink class="nav-link" to="/contacts">Contacts</NavLink>
              </li>
              <li class="nav-item">
                <NavLink class="nav-link" to="/appointments">Appointments</NavLink>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Logged in as: {firstname} {lastname}</a>
              </li>
              <div className="d-flex">
                <Button className="navbar-brand" variant='link' style={{justifyContent: "center"}} onClick={handleLogout}>Log Out</Button>
              </div>
            </ul>
        </div>
      </nav>
      <section style={{marginTop: '100px', background: 'rgba(0, 0, 0, 0.5)', borderRadius: "5px", padding: " 50px 50px 70px"}}>
        <h2>Add Appointment</h2>
        <AppointmentForm title={title} contact={contact} contacts={contacts} date={date} time={time} 
        setTitle={setTitle} setContact={setContact} setDate={setDate} setTime={setTime} handleSubmit={handleSubmit} twentyFourTime={twentyFourTime} setTwentyFourTime={setTwentyFourTime}/>
        {error && <Alert variant="danger" style={{marginTop: "50px"}}>{error}</Alert>}
      </section>
      <hr />
      <section style={{background: 'rgba(0, 0, 0, 0.5)', padding: " 50px 50px 70px", borderRadius: "5px"}}>
        <h2>Appointments</h2>
        <AppointmentTileList />
      </section>
    </div>
  );
};
