import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { useDispatch } from "react-redux";
let _ = require('lodash');




export const loadContacts = createAsyncThunk(
    "contacts/getContactsByUser", 
    async (userID) => {
        let contacts;
        await Axios.get(`https://appointment-planner-api.onrender.com/getContact/${userID}`).then((response) => {
            contacts = response.data;
        })

        return contacts;

    }
)


export const addContactToDB = createAsyncThunk(
    "contacts/addContact", 
    async (contact, thunkAPI) => {
        await Axios.post("https://appointment-planner-api.onrender.com/createContact", {
            uid: contact.uid,
            name: contact.name,
            phone: contact.phoneNumber, 
            email: contact.email
        })

        return {
            uid: contact.uid,
            name: contact.name,
            phone: contact.phoneNumber, 
            email: contact.email
        }
    }

)

export const removeContactFromDB = createAsyncThunk(
    "contacts/removeContactFromDB", 
    async (name) => {
        await Axios.delete(`https://appointment-planner-api.onrender.com/deleteContact/${name}`).then((response) => {
            console.log(response);
        })    
    }
)


export const updateContactDB = createAsyncThunk(
    "contacts/updateContactDB", 
    async (newObj) => {
        await Axios.put(`https://appointment-planner-api.onrender.com/updateContact/`, {
            newObject: newObj
        }).then((response) => {
            console.log(response);
        })    
    }
)

    
    
  





const contactsSlice = createSlice({
    name: 'contacts', 
    initialState: {
        contacts: [],
    },
    reducers: {
        addContact: (state, action) => {
            state.contacts.push(action.payload);
        },
        removeContact: (state, action) => {
            state.contacts = state.contacts.filter((contact) => !_.isEqual(action.payload, contact))
        },
        updateContact: (state, action) => {
            const index = state.contacts.findIndex((obj => obj.name == action.payload.originalName))

            delete action.payload.originalName;
            state.contacts[index] = action.payload;

        }
    },

    extraReducers: {
        [addContactToDB.fulfilled]: (state, action) => {
            
        },

        [removeContactFromDB.fulfilled]: (state, action) => {

        },

        

        [loadContacts.fulfilled]: (state, action) => {
            const contacts = action.payload.map((contact) => {
                delete contact.__v;
                delete contact._id;
                return contact
            })

            state.contacts = contacts;
            
        }
    }

});

export const selectContacts = (state) => { 
    return state.contacts.contacts
};



export const { addContact, removeContact, updateContact } = contactsSlice.actions;
export default contactsSlice.reducer;