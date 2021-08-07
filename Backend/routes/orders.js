const express = require("express");

const OrdersController = require("../controllers/orders");

const router = express.Router();

router.post("/sendOrder", OrdersController.sendOrder);

router.get("/getOrders", OrdersController.getOrders);

module.exports = router;