import { current } from '@reduxjs/toolkit';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadContacts, selectContacts } from '../../containers/contactsPage/contactsSlice';
import { useAuth } from '../../contexts/AuthContext';
import ContactTile from '../contactTile/ContactTile';

export default function ContactTileList() {
    const dispatch = useDispatch();

    const {currentUser} = useAuth();
    console.log(currentUser)

    useEffect(() => {
        if (currentUser) {
            dispatch(loadContacts(currentUser.uid));
        }
    }, [dispatch, currentUser])

    const contacts = useSelector(selectContacts)


    return (
        <div className='tileList'>
            {
                contacts.map((contact, index) => {    
                    return (
                        <ContactTile contact={contact} key={index}/>
                    )
                })
            }
    </div>
    )
}
