const Order = require("../models/order");

exports.sendOrder = (req, res, next) => {
    const order = new Order({
        name: req.body.name,
        phone: req.body.phone,
        course: req.body.course,
        price: req.body.price
      });
      //sejvovanje u bazu
      order.save().then(createdOrder => {
        res.status(201).json({
          message: "Uspešno dodavanje porudžbine!",
          order: {
            ...createdOrder,
            _id: createdOrder._id
          }
        });
      })
      .catch(error => {
        res.status(500).json({
          message: "Neuspešno kreiranje porudžbine"
        });
      }); 
};

exports.getOrders = (req, res, next) => {
    const orderQuery = Order.find();
    let fetchedOrders;
    
    orderQuery
    .then(documents => {
        fetchedOrders = documents;
      res.status(200).json({
        message: "Orders fetched successfully!",
        orders: fetchedOrders
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Neuspešno dobavljanje porudžbina iz baze podataka"
      });
    });
};