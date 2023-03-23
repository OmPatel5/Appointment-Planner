import React, { useState } from 'react'
import Axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { useDispatch } from 'react-redux';
import { removeContact, removeContactFromDB, updateContact, updateContactDB } from '../../containers/contactsPage/contactsSlice';

export default function ContactTile({contact}) {

    const dispatch = useDispatch();
    

    const [isEdit, setIsEdit] = useState(false);


		const {currentUser} = useAuth();



    // returns keys of contact obj
    const displayedContact = Object.keys(contact).filter((contactVal) => contactVal !== '_id' && contactVal !== 'uid' && contactVal !== '__v');
    const title = displayedContact.shift();



    // const emailPattern = String.raw`^\S+@\S+$`
    // const patternsContact = ["[0-9]{3}-[0-9]{3}-[0-9]{4}", emailPattern]
    // const patternsAppointment = []
    // const values = [];
    // const types = ['date', 'time'];
  
    // const {currentUser} = useAuth();
  
    // for (let key in info) {
    //   values.push(info[key])
    // }
  
    // const firstElement = values.shift();
    // const secondElement = values.shift();
    // let lastElement;
    // if (props.isAppointment && props.isEdit) {
    //   lastElement = values.pop()
    // } 
    


    // function onEditSubmit(e) {

    // }

    const onRemove = (e) => {
      e.preventDefault();
      dispatch(removeContactFromDB(contact.name));
      dispatch(removeContact(contact))

    }


    const onSubmit = (e) => {
        // let from = 'APPOINTMENT';
        e.preventDefault();
        let newObj;

        let [name, phoneNumber, email] = [e.target[0].value, e.target[1].value, e.target[2].value];
            newObj = {
							uid: currentUser.uid,
							name: name, 
							phoneNumber: phoneNumber,
							email: email,
              originalName: contact.name
        }

				// Axios call to server (update)
        dispatch(updateContactDB(newObj))
        dispatch(updateContact(newObj))
        
        setIsEdit(false);

      }


    if (isEdit) {
        return (
					<div className={"tile-container"}>
						<form onSubmit={onSubmit}>          
								<input className="tile tile-title" defaultValue={contact[title]} /> 
								{displayedContact.map((val, index) => (
									<input type='text' key={index} defaultValue={contact[val]} />
								))} 
		
								<input type="submit" value='Save'/>
						</form>
          </div>
        )
    }

    return (
      <div className={"tile-container"}>
        <p className='tile tile-title'>{contact[title]}
				<img className='editButton' src={require('./editIcontest.png').default} onClick={(e) => {setIsEdit(true)}}  alt='' />
				<button className="remove" onClick={onRemove} src={require('./editIcontest.png').default}>x</button></p>

        {displayedContact.map((val, index) => {
            return <p className='tile' key={index}>{contact[val]}</p>
        })}
      </div>
    );
}

/* {
          isEdit ?      
          <> 
          <form onSubmit={(e) => onSubmit(e)}>          
            <input className="tile tile-title" defaultValue={secondElement} /> 
            {values.map((val, index) => (
              <input type='text' key={index} defaultValue={val} pattern={patternsContact[index]}/>
            ))} 
  
            <input type="submit" value='Save'/>
          </form>
          </>
          :
          <>
          <p className="tile tile-title">{secondElement} <img className='editButton' onClick={(e) => {setIsEdit(true)}}  alt='' /><button className="remove" onClick={() => props.removeContact(contact)}>x</button></p>
          <hr/>
          {values.map((val, index) => (
              <p className='tile' key={index}>{val}</p>
          ))}
          <p className="tile">{lastElement}</p>
  
          </>
          
        } */