const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    body('password', 'Please enter a valid password').isLength({ min: 5 }),
  ],
  authController.postLogin
);

router.post(
  '/signup',
  [
    check('email', 'Please enter a valid email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject('Email already exists...Please pick a different email');
          }
        });
      }),
    body('password', 'Please enter a password with a least 5 characters').isLength({ min: 5 }),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewpassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
