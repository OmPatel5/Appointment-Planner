const mongoose = require('mongoose')

const AppointmentSchema = new mongoose.Schema({
    uid: {
        type: String, 
        required: true
    },
    title: {
        type: String, 
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time:  {
        type: String,
        required: true
    }, 
    contact:  {
        type: String,
        required: true
    }
});

const AppointmentModel = mongoose.model("appointments", AppointmentSchema)
module.exports = AppointmentModel;