const express = require("express");

const ContactController = require("../controllers/contact");

const router = express.Router();

router.post("/", ContactController.sendMail);

module.exports = router;