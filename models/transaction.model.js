const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const transactionSchema = new Schema({
        cms_id: {
          type: String,
          lowercase: true,
          required: [true, "CMS ID can't be empty"],
          match: [
            /^(\d{3}-\d{2}-\d{4})?$/,
            "CMS ID format is not correct",
          ],
          unique: false,
        },
        date: {
          type: Date,
          default: Date.now,
          required: true,
        },
        time: {
          type: String,
          default: new Date().toLocaleTimeString(),
          required: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
        device_id: {
          type: String,
          required: true,
          match: [
            /^[a-zA-Z]+-\d+$/,
            "Device ID format is not correct",
          ],
          unique: false,
        },
      }, { timestamps: true });

const TransactionModel = db.model('transaction',transactionSchema);
module.exports = TransactionModel;