const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const user = require('./user.model');
const device = require('./device.model');


const transactionSchema = new Schema({
  cms_id: {
      type: String,
      ref: 'user', // Reference to the User model
      required: true
  },
  date: {
      type: Date,
      default: Date.now,
      required: true
  },
  time: {
      type: String,
  },
  
  device_id: {
      type: String,
      ref: 'device', // Reference to the Device model
      required: true
  }
}, { timestamps: true });

// Set the current time before saving the transaction
transactionSchema.pre('save', function(next) {
  const currentTime = new Date().toLocaleTimeString();
  this.time = currentTime;
  next();
});

const transaction = db.model('transaction', transactionSchema);
module.exports = transaction;
