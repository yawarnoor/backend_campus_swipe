const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const user = require('./user.model');

const subscriptionSchema = new Schema({
  cms_id: {
    type: String,
    ref: 'user', // Reference to the User model
    required: true
    
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
    }
}, { timestamps: true });

const subscription = db.model('subscription',subscriptionSchema);
module.exports = subscription;
