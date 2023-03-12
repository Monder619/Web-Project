const db = require('../models/index');
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post(
  '/createUser',
  body('email').not().isEmpty(),
  body('password').not().isEmpty(),
  body('telephone').not().isEmpty(),
  body('role').not().isEmpty(),
  async function (req, res) {
    const { email, password, telephone, role } = req.body;
    try {
      const user = await db.users.create({
        email: email,
        password: password,
        telephone: telephone,
        role: role,
      });
      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
);

router.post(
  '/loginUser',
  body('email').not().isEmpty(),
  body('password').not().isEmpty(),
  async function (req, res) {
    const { email, password } = req.body;
    try {
      const foundUser = await db.users.findOne({
        where: { email: email, password: password },
      });
      if (foundUser.dataValues) {
        const token = jwt
          .sign(foundUser.dataValues, 'testtest')
          .substring(0, 16);
        const result = await db.users.update(
          { token: token },
          {
            where: { email: email, password: password },
          }
        );
        return res.status(200).send(token);
      } else {
        return res.status(400).send("User didn't found");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
);

router.post(
  '/logoutuser',
  body('email').not().isEmpty(),
  body('password').not().isEmpty(),
  async function (req, res) {
    const { email, password } = req.body;
    try {
      const foundUser = await db.users.findOne({
        where: { email: email, password: password },
      });
      if (foundUser.dataValues) {
        const result = await db.users.update(
          { token: null },
          {
            where: { email: email, password: password },
          }
        );
        return res.status(200).send('user logout successfully');
      } else {
        return res.status(400).send("User didn't found");
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
);
module.exports = router;
