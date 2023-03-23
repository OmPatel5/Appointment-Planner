const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    uid: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true
    }, 
});

const ContactModel = mongoose.model("contacts", ContactSchema)
module.exports = ContactModel;