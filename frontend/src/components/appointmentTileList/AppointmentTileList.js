import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAppointments, selectAppointments } from '../../containers/appointmentsPage/appointmentsSlice';
import { loadContacts, selectContacts } from '../../containers/contactsPage/contactsSlice';
import { useAuth } from '../../contexts/AuthContext';
import AppointmentTile from '../appointmentTile/AppointmentTile';
import ContactTile from '../contactTile/ContactTile';

export default function AppointmentTileList() {
    const dispatch = useDispatch();

    const {currentUser} = useAuth();

    useEffect(() => {
        console.log('e')
        dispatch(loadAppointments(currentUser.uid));
        dispatch(loadContacts(currentUser.uid))
    }, [dispatch])

    const appointments = useSelector(selectAppointments)
    

    return (
        <div className='tileList'>
            {
                appointments.map((appointment, index) => {    
                    return (
                        <AppointmentTile appointment={appointment} key={index}/>
                    )
                })
            }
    </div>
    )
}
