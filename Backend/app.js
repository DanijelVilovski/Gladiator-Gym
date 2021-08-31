const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const coursesRoutes = require('./routes/courses');
const usersRoutes = require('./routes/user');
const ordersRoutes = require('./routes/orders');
const contactsRoutes = require('./routes/contact');

//express app
const app = express();
const stripe = require('stripe')('sk_test_51JMCMeAhEqxGmwGxG6FdQwZhTp8B2Msc7wzYfm84GPtVZWYD733bEliIKDNE1gshifTniTsnqZI6xD5Ii2l91maP00q0KlLfdb');


//connect to mongodb
const dbUPI = 'mongodb+srv://danijel:wO0tsn2RbSa4P6Ic@cluster0.myqfw.mongodb.net/WEB-Projekat?retryWrites=true&w=majority';
mongoose.connect(dbUPI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log(err);
  }); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("../Backend/images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  //dozvola za pristup resursima na serveru od strane drugih domena
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  //dozvovavanje dodatnih headera, metoda
  next();
});

app.post('/payment', (req,res) => {
  console.log(req.body);
  var charge = stripe.charges.create({
    amount: req.body.price * 100,
    currency: 'RSD',
    source: req.body.token
  }, (err, charge)=> {
    if(err) {
      throw err;
    }
    res.json({
      success: true,
      message: "Payment done!"
    })
    
  });
})

app.use("/api/courses", coursesRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/contact", contactsRoutes);

module.exports = app;