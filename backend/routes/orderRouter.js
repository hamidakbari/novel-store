import express from 'express';
import { isAuth } from '../utils.js';
import { Order } from '../models/order-model.js';

const orderRouter = express.Router();

orderRouter.post('/', isAuth, async (req, res) => {
  console.log(req.body.paymentMethod);
  console.log(req.body.orderItems);
  const newOrder = new Order({
    orderItems: req.body.orderItems.map((x) => ({ ...x, book: x._id })),
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    user: req.user._id,
  });
  const order = await newOrder.save();
  res.status(201).send({ message: 'new order created!', order });
});

orderRouter.put('/:id/pay', isAuth, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updated_time: req.body.updated_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    res.send({ message: 'order is paid', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'order Not Found!' });
  }
});

orderRouter.get('/order/:id', isAuth, async (req, res) => {
  console.log('hello');
  const id = req.params.id;
  console.log(id);
  try {
    const order = await Order.findById(id);
    console.log(order);
    if (order) {
      res.send(order);
    } else {
      res.status(422).send('order Not Found!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});
export default orderRouter;
