const express = require('express');
const app = express();
const moongoose = require('mongoose');
const ContactModel = require('./models/contacts.js')
const UserModel = require('./models/users.js')
const AppointmentModel = require('./models/appointments.js')

require("dotenv").config();



const cors = require('cors')
app.use(cors())

app.use(express.json())

moongoose.connect(process.env.MONGO_DB_CONNECTION_URL);


app.get("/getContact", (req, res) => {
    ContactModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    })
})

app.get("/getAppointments", (req, res) => {
    AppointmentModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    })
})

app.post("/createContact", async (req, res) => {
    const contact = req.body;
    const newContact = new ContactModel(contact);
    await newContact.save();

    res.json(contact)
})


app.post("/createAppointment", async (req, res) => {
    const appointment = req.body;
    const newAppointment = new AppointmentModel(appointment);
    await newAppointment.save();

    res.json(appointment)
})


app.put("/updateContact", async (req, res) => {
    const newContact = req.body.newObject;
    const id = req.body.id;

    try {
        await ContactModel.findById(id, (err, updatedContact) => {
            updatedContact.name = newContact.name
            updatedContact.phone = newContact.phoneNumber
            updatedContact.email = newContact.email
            
            updatedContact.save();
            res.send('update was successful');
        })
    } catch(err) {
        console.log(err)
    }
})

app.put("/updateAppointment", async (req, res) => {
    const newAppointment = req.body.newObject;
    const id = req.body.id;

    try {
        await AppointmentModel.findById(id, (err, updatedAppointment) => {
            updatedAppointment.title = newAppointment.title
            updatedAppointment.date = newAppointment.date
            updatedAppointment.time = newAppointment.time
            updatedAppointment.contact = newAppointment.contact

            
            updatedAppointment.save();
            res.send('update was successful');    
        })
    } catch(err) {
        console.log(err)
    }
})

app.delete("/deleteContact/:id", async (req, res) => {
    const id = req.params.id;

    await ContactModel.findByIdAndRemove(id).exec();
    res.send('delete was successful')
})

app.delete("/deleteAppointment/:id", async (req, res) => {
    const id = req.params.id;

    await AppointmentModel.findByIdAndRemove(id).exec();
    res.send('delete was successful')
})





app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.send('successfully added user')
})

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    })
})




app.listen(3001, () => {
    console.log("Server is Running")
});  