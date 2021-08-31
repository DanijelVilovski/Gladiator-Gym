const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        fullName: req.body.fullName
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "Korisnik kreiran!",
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Unet email je već registrovan"
          });
        });
    });
};

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    let isAdmin = false;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Korisnik sa unetom email adresom nije registrovan"
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Uneta lozinka nije tačna"
          });
        }
        if (fetchedUser.isAdmin)
        {
          isAdmin = true;
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: token,
          expiresIn: 3600,
          isAdmin: isAdmin,
          id: fetchedUser._id,
          fullName: fetchedUser.fullName
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Greška"
        });
      });
};

exports.getUsers = (req, res, next) => {
  const userQuery = User.find();
  let fetchedUsers;
  userQuery
  .then(documents => {
      fetchedUsers = documents;
    res.status(200).json({
      message: "Users fetched successfully!",
      users: fetchedUsers
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Neuspešno dobavljanje korisnika iz baze podataka"
    });
  });
};

