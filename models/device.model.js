const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;


const deviceSchema = new Schema({
        device_id: {
          type: String,
          required: true,
          unique: true,
          match: [
            /^[a-zA-Z]+-\d+$/,
            "Device ID format is not correct",
          ],
        },
        location:{
            type: String,
        },

      }, { timestamps: true });
      

const device = db.model('device',deviceSchema);
module.exports = device;