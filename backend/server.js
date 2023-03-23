const express = require('express');
const app = express();
const moongoose = require('mongoose');
const ContactModel = require('./models/contacts.js')
const UserModel = require('./models/users.js')
const AppointmentModel = require('./models/appointments.js')

require("dotenv").config();



const cors = require('cors');

app.use(cors())

app.use(express.json())
moongoose.connect(process.env.MONGO_DB_CONNECTION_URL);


app.get("/getContact/:uid", (req, res) => {

    const uid = req.params.uid;

    ContactModel.find({"uid": uid}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            // console.log(result)
            res.send(result)
        }
    })
})

app.get("/getAppointments/:uid", (req, res) => {
    const uid = req.params.uid;

    AppointmentModel.find({"uid": uid}, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            // console.log(result)
            res.send(result)
        }
    })
    
})

app.post("/createContact", async (req, res) => {
    console.log(req.body)
    const contact = req.body;
    const newContact = new ContactModel(contact);
    await newContact.save();

    res.json(newContact)
})


app.post("/createAppointment", async (req, res) => {
    const appointment = req.body;
    const newAppointment = new AppointmentModel(appointment);
    await newAppointment.save();

    res.json(appointment)
})


app.put("/updateContact", async (req, res) => {
    const newContact = req.body.newObject;
    const originalName = req.body.newObject.originalName;

    try {
        await ContactModel.updateOne({name: originalName}, {
            '$set':{
                name: newContact.name,
                phone: newContact.phoneNumber,
                email: newContact.email
            }
        })

    } catch(err) {
        res.send(err)
    }
})

app.put("/updateAppointment", async (req, res) => {
    const newAppointment = req.body.newObject;
    const originalTitle = req.body.newObject.originalTitle;

    try {
        await AppointmentModel.updateOne({title: originalTitle}, {
            '$set':{
                title: newAppointment.title,
                date: newAppointment.date,
                time: newAppointment.time, 
                contact: newAppointment.contact
            }
        })

    } catch(err) {
        res.send(err)
    }
})

app.delete("/deleteContact/:name", async (req, res) => {
    const name = req.params.name;

    await ContactModel.remove( {"name": name} ).exec();
    res.send('delete was successful')
})

app.delete("/deleteAppointment/:title", async (req, res) => {
    const title = req.params.title;

    await AppointmentModel.remove( {"title": title}).exec();
    res.send('delete was successful')
})





app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.send('successfully added user')
})

app.post("/createUserGoogle", async (req, res) => {
    const user = req.body;

    UserModel.find({"userid": user.uid}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            if (result.length === 0) {
                const newUser = new UserModel(user);
                newUser.save();
                res.send('successfully added user')
            }
        }
    })
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

app.get("/getUserByUID/:uid", (req, res) => {
    const uid = req.params.uid;
    UserModel.find({ "userid": uid}, (err, result) => {
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