const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const cardSchema = new Schema({
        card_id: {
          type: String,
          required: true,
          unique: true,
        },
        cms_id: {
            type: String,
            ref: 'user', // Reference to the User model
            required: [true, "cms id is required"],
        },
      }, { timestamps: true });
      

const card = db.model('card',cardSchema);
module.exports = card;