const db = require('../models/index');
const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();

router.post(
  '/createOrder',
  body('product').not().isEmpty(),
  body('user').not().isEmpty(),
  async function (req, res) {
    const { product, user } = req.body;
    try {
      let fproduct = await db.products.findOne({ where: { id: product } });
      fproduct = fproduct?.toJSON();
      let quantity = fproduct?.quantity - 1;
      await db.products.update(
        { quantity: quantity },
        {
          where: { id: product },
        }
      );

      await db.orders.create({
        product: product,
        user: user,
      });
      return res.status(200).send('Order created successfully');
    } catch (error) {
      return res.status(400).send('Something went wrong you mightnot be admin');
    }
  }
);

router.get(
  '/getOrderDetails/:user',
  param('user').not().isEmpty(),
  async function (req, res) {
    const user = req.params.user;
    console.log(user);
    try {
      const [results, metadata] = await db.sequelize.query(
        `SELECT * FROM orders JOIN users ON orders.user=users.id where orders.user=${user}`
      );
      console.log(JSON.stringify(results, null, 2));
      return res.status(200).send(JSON.stringify(results, null, 2));
    } catch (error) {
      console.log(error);
      return res.status(400).send('Something went wrong you mightnot be admin');
    }
  }
);

module.exports = router;
