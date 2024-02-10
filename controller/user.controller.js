const UserServices = require('../services/user.service');
const { mockDataTeam, mockDataUsers} = require("../data/mockData.js");

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password, address, cms_id, phone_no } = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${email}, Already Registered`)
        }
        const response = await UserServices.registerUser(email, password, address, cms_id, phone_no);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: user._id, email: user.email };
    

        const token = await UserServices.generateAccessToken(tokenData,"secret","1m")

        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.team = async (req, res, next) => {
    res.json(mockDataTeam);
  }

exports.users = async (req, res, next) => {
    try {
        const users = await UserServices.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
    console.log("---> err -->", err);
    next(err);
}
  }
