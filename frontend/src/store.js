import { configureStore } from '@reduxjs/toolkit';
import appointmentsReducer from './containers/appointmentsPage/appointmentsSlice';
import contactsReducer from './containers/contactsPage/contactsSlice';


export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
        appointments: appointmentsReducer
    }
})