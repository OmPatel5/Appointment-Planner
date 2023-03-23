import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { useDispatch } from "react-redux";
let _ = require('lodash');




export const loadAppointments = createAsyncThunk(
    "appointments/getAppointmentsByUser", 
    async (userID) => {
        let appointments;
        await Axios.get(`https://appointment-planner-api.onrender.com/getAppointments/${userID}`).then((response) => {
            console.log(response)
            appointments = response.data;
        })

        return appointments;

    }
)


export const addAppointmentToDB = createAsyncThunk(
    "appointments/addAppointment", 
    async (appointment, thunkAPI) => {
        await Axios.post("https://appointment-planner-api.onrender.com/createAppointment", {
            uid: appointment.uid,
            title: appointment.title,
            date: appointment.date, 
            time: appointment.time,
            contact: appointment.contact
        })

        return {
            uid: appointment.uid,
            title: appointment.title,
            date: appointment.date, 
            time: appointment.time,
            contact: appointment.contact
        }
    }

)

export const removeAppointmentFromDB = createAsyncThunk(
    "appointments/removeAppointmentFromDB", 
    async (title) => {
        await Axios.delete(`https://appointment-planner-api.onrender.com/deleteAppointment/${title}`).then((response) => {
            console.log(response);
        })    
    }
)


export const updateAppointmentDB = createAsyncThunk(
    "appointments/updateAppointmentDB", 
    async (newObj) => {
        await Axios.put(`https://appointment-planner-api.onrender.com/updateAppointment/`, {
            newObject: newObj
        }).then((response) => {
            console.log(response);
        })    
    }
)

    
    
  





const appointmentsSlice = createSlice({
    name: 'appointments', 
    initialState: {
        appointments: [],
    },
    reducers: {
        addAppointment: (state, action) => {
            state.appointments.push(action.payload);
        },
        removeAppointment: (state, action) => {
            state.appointments = state.appointments.filter((appointment) => !_.isEqual(action.payload, appointment))
        },
        updateAppointment: (state, action) => {
            const index = state.appointments.findIndex((obj => obj.title == action.payload.originalTitle))

            delete action.payload.originalTitle;
            state.appointments[index] = action.payload;

        }
    },

    extraReducers: {
        [addAppointmentToDB.fulfilled]: (state, action) => {
            
        },

        [removeAppointmentFromDB.fulfilled]: (state, action) => {

        },

        

        [loadAppointments.fulfilled]: (state, action) => {
            const appointments = action.payload.map((appointment) => {
                delete appointment.__v;
                delete appointment._id;
                return appointment
            })


            state.appointments = appointments;
            
        }
    }

});

// reminder: add to store

export const selectAppointments = (state) => { 
    return state.appointments.appointments
};



export const { addAppointment, removeAppointment, updateAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;