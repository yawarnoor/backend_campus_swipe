const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const subscriptionSchema = new Schema({
        cms_id: {
          type: String,
          lowercase: true,
          required: [true, "CMS ID can't be empty"],
          match: [
            /^(\d{3}-\d{2}-\d{4})?$/,
            "CMS ID format is not correct",
          ],
          unique: true,
        },
        duration: {
            type: String,
            enum: ['7d', '30d', '90d'],
            required: true
        },
        subscriptionDate: {
            type: Date,
            required: true,
            default: Date.now 
        },
      }, { timestamps: true });
      

const SubscriptionModel = db.model('subscription',subscriptionSchema);
module.exports = SubscriptionModel;