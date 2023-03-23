import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeAppointment, removeAppointmentFromDB, updateAppointment, updateAppointmentDB } from '../../containers/appointmentsPage/appointmentsSlice';
import { loadContacts, selectContacts } from '../../containers/contactsPage/contactsSlice';
import { useAuth } from '../../contexts/AuthContext';
import { ContactPicker } from '../contactPicker/ContactPicker';


export default function AppointmentTile({appointment}) {

    const types = ['date', 'time', 'text']

    const dispatch = useDispatch();
    

    const [isEdit, setIsEdit] = useState(false);


		const {currentUser} = useAuth();

  

    const contacts = useSelector(selectContacts)



    // returns keys of contact obj
    const displayedAppointment = Object.keys(appointment).filter((appointmentVal) => appointmentVal !== '_id' && appointmentVal !== 'uid' && appointmentVal !== '__v');
    const title = displayedAppointment.shift();


    // const onRemove = (e) => {
    //   e.preventDefault();
    //   dispatch(removeContactFromDB(contact.name));
    //   dispatch(removeContact(contact))

    // }

    function onTimeChange(originalTime) {
      var timeSplit = originalTime.split(':'),
        hours,
        minutes,
        meridian;
      hours = timeSplit[0];
      minutes = timeSplit[1];
      if (hours > 12) {
        meridian = 'PM';
        hours -= 12;
      } else if (hours < 12) {
        meridian = 'AM';
        if (hours == 0) {
          hours = 12;
        }
      } else {
        meridian = 'PM';
      }
      const time = hours + ':' + minutes + ' ' + meridian;
      return time;
    }


    const onSubmit = (e) => {
        e.preventDefault();
        let newObj;

        let [title, date, time, contact] = [e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value];
            newObj = {
							uid: currentUser.uid,
              title: title, 
              date: date,
              time: onTimeChange(time), 
              contact: contact,
              originalTitle: appointment.title
        }

				// Axios call to server (update)
        dispatch(updateAppointmentDB(newObj))
        dispatch(updateAppointment(newObj))
        setIsEdit(false);

      }

      const onRemove = (e) => {
        e.preventDefault();
        dispatch(removeAppointmentFromDB(appointment.title));
        dispatch(removeAppointment(appointment))
  

      }

    if (isEdit) {
        return (
					<div className={"tile-container-appointment"}>
						<form onSubmit={onSubmit}>          
								<input className="tile tile-title" defaultValue={appointment[title]} />
                {displayedAppointment.pop()} 
								{displayedAppointment.map((val, index) => (
									<input key={index} defaultValue={appointment[val]} type={types[index]}/>
								))} 
                
                <ContactPicker contacts={contacts} isTile={true} />
		
								<input type="submit" value='Save'/>
						</form>
          </div>
        )
    }

    return (
      <div className={"tile-container-appointment"}>
        <p className='tile tile-title'>{appointment[title]}
				<img className='editButton'  src={require('../contactTile/editIcontest.png').default} onClick={(e) => {setIsEdit(true)}}  alt='' />
				<button className="remove" onClick={onRemove} src={""}>x</button></p>

        {displayedAppointment.map((val) => {
            return <p className='tile'>{appointment[val]}</p>
        })}
      </div>
    );
}
