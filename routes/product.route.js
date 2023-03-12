const db = require('../models/index');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.post(
  '/createProduct',
  body('name').not().isEmpty(),
  body('quantity').not().isEmpty(),
  body('price').not().isEmpty(),
  body('falvour').not().isEmpty(),
  body('token').not().isEmpty(),
  async function (req, res) {
    const { name, quantity, price, flavour, token } = req.body;
    try {
      let user = await db.users.findOne({ where: { token: token } });
      user = user?.toJSON();
      if (user?.token == token) {
        await db.products.create({
          name: name,
          quantity: quantity,
          price: price,
          flavour: flavour,
        });
        return res.status(200).send('Product created successfully');
      } else {
        return res.status(400).send('You are not admin');
      }
    } catch (error) {
      return res.status(400).send('Something went wrong you mightnot be admin');
    }
  }
);

module.exports = router;
