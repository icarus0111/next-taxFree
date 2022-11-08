const r = require('express').Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../../public/temp_files/'));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

module.exports = r;

const email = require('../controller/email')
r.post('/api/v1/email/customer-query',email.sendCustomerQuery)
r.post(
  '/api/v1/email/contract-png',
  upload.array('file'),
  email.sendPngContract
);

const stripe = require('../controller/stripe')
r.post('/api/v1/stripe-session-forward',stripe.sessionForward)
r.post('/api/v1/stripe/session', stripe.session)

const account = require('../controller/account')
r.get('/api/v1/account',account.get)
r.post('/api/v1/account/signup', account.signup);
r.post('/api/v1/account/login', account.login);
r.post('/api/v1/account/forgot-password', account.forgotPassword);
r.post('/api/v1/account/reset-password', account.resetPassword);
r.get('/api/v1/account/logout', account.logout);
r.get('/api/v1/account/details',account.details)
