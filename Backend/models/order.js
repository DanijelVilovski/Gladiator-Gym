const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required:true },
    price: { type: Number, required: true }
}, { timestamps: true 
});

module.exports = mongoose.model("Order", orderSchema);