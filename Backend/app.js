const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const coursesRoutes = require('./routes/courses');
const usersRoutes = require('./routes/user');
const ordersRoutes = require('./routes/orders');

//express app
const app = express();

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

app.use("/api/courses", coursesRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/orders", ordersRoutes);


module.exports = app;