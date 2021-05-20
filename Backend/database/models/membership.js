const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
    name: {
        type: String,
        required: true
      },
    price: {
        type: Number,
        required: true
      },
    about: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const Membership = mongoose.model('Membership', membershipSchema);
module.exports = Membership;  