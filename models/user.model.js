const db = require('../config/db');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name:{
        type: String,
        lowercase: true,
        match: [
            /^[a-zA-Z-' ]+$/,
            "Name format is not correct",
        ],
    },
    last_name:{
        type: String,
        lowercase: true,
        match: [
            /^[a-zA-Z-' ]+$/,
            "Name format is not correct",
        ],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "userName can't be empty"],
        // @ts-ignore
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "userName format is not correct",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    cms_id:{
        type: String,
        lowercase: true,
        required: [true, "CMS ID can't be empty"],
        match: [
            /^(\d{3}-\d{2}-\d{4})?$/, //////////////////////////////////
            "CMS ID format is not correct",
        ],
        unique: true,
    },
    phone_no:{
        type: String,
        lowercase: true,
        required: [true, "Phone Number is required"],
        match: [
            /^03[0-9]{9}$/, //////////////////////////////////
            "Phone No format is not correct",
        ],
        unique: true,
    },
    address:{
        type: String,
        lowercase: true,
        required: true,
    },
    is_subscribed:{
        type: Boolean,
        default: false,
    }

},{timestamps:true});


// used while encrypting user entered password
userSchema.pre("save",async function(){
    var user = this;
    if(!user.isModified("password")){
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);

        user.password = hash;
    }catch(err){
        throw err;
    }
});


//used while signIn decrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        console.log('----------------no password',this.password);
        // @ts-ignore
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const UserModel = db.model('user',userSchema);
module.exports = UserModel;