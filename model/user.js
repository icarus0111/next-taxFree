const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  email:            { type: String, unique: true },
  password:         { type: String },
  firstName:        { type: String },
  lastName:         { type: String },
  address:          { type: Object },
  billingDetails:   { type: Object },
  isFinanced:       { type: Boolean},
  onlinePay:        { type: Boolean},
  chargeSucceeded:  { type: Boolean},
  stripeCustomerID: { type: String},
},{ timestamps: true });

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema, 'User');
