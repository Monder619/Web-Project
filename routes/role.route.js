const db = require('../models/index');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

router.post(
  '/createRole',
  body('role').not().isEmpty(),
  async function (req, res) {
    const role = req.body.role;
    try {
      await db.roles.create({ name: role });
      return res.status(200).send('Role created successfully');
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
);

module.exports = router;
