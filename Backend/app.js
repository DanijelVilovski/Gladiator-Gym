const express = require('express');
const mongoose = require('mongoose');
const User = require('./database/models/user');
const Membership = require('./database/models/membership');

//express app
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://danijel:test1234@cluster0.myqfw.mongodb.net/WEB_Projekat_BazaPodataka?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.get('/add-user', (req, res) => {
    const user = new User({
        name: 'Danijel',
        surname: 'Vilovski',
        email: 'danivilovski@gmail.com',
        password: 'password'
    });
    user.save()
        .then((result) =>{
            res.send(result)
        })
        .catch((err) =>{
            console.log(err)
        });
})

app.get('/', function (req, res) {
    res.send('Ideeeee gas');
})