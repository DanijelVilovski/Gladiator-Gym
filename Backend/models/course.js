const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
      },
    price: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
      },
    imagePath: {
      type: String,
        required: true,
    }
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;  