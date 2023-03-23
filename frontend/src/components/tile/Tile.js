import React from "react";
import {ContactPicker} from '../contactPicker/ContactPicker'
import { useAuth } from "../../contexts/AuthContext";

const _ = require('lodash'); 


export const Tile = (props) => {
  const isEdit = props.isEdit;
  const info = props.info;
  const setIsEdit = props.setIsEdit;
  const emailPattern = String.raw`^\S+@\S+$`
  const patternsContact = ["[0-9]{3}-[0-9]{3}-[0-9]{4}", emailPattern]
  const patternsAppointment = []
  const values = [];
  const types = ['date', 'time'];

  const {currentUser} = useAuth();

  for (let key in info) {
    values.push(info[key])
  }

  const firstElement = values.shift();
  const secondElement = values.shift();
  let lastElement;
  if (props.isAppointment && props.isEdit) {
    lastElement = values.pop()
  } 
  function handleOnchangeEdit(e) {
    info.contact = e.target.value;
  }
  return (
    <div className={props.isAppointment ? "tile-container-appointment" : "tile-container"}>
      {
        isEdit && _.isEqual(props.isEditContact, info) ?      
        <> 
        <form onSubmit={(e) => {
          e.preventDefault();
          let from = props.isAppointment ? 'appointment' : 'contact';
          props.onSubmit(e, info, from, currentUser)}
          }>          
          <input className="tile tile-title" defaultValue={secondElement} /> 
          {values.map((val, index) => (
            props.isAppointment ? <input type={types[index]} key={index} defaultValue={val}/> : <input type='text' key={index} defaultValue={val} pattern={patternsContact[index]}/>
          ))} 

          {props.isAppointment ? <ContactPicker contacts={props.contacts} handleOnchangeEdit={handleOnchangeEdit} isTile={true}/> : ""}
          <input type="submit" value='Save'/>
        </form>
        </>
        :
        <>
        <p className="tile tile-title">{secondElement} <img className='editButton' onClick={(e) => {setIsEdit(true); props.setIsEditContact(info)}} alt='' /><button className="remove" onClick={() => props.isAppointment ? props.removeAppointment(info) : props.removeContact(info)}>x</button></p>
        <hr/>
        {values.map((val, index) => (
            <p className='tile' key={index}>{val}</p>
        ))}
        <p className="tile">{lastElement}</p>

        </>
        
      }
    </div>
  );
};
