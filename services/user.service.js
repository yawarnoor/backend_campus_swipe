const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

class UserServices{
 
    static async registerUser(first_name, last_name, semester, email, password, address, cms_id, phone_no, degree_name ) {
        try{
                console.log("-----Email --- Password-----",email,password);
                
                const createUser = new UserModel({first_name, last_name, semester, email,password, address, cms_id, phone_no, degree_name });
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async getAllUsers(){
        try{
            return await UserModel.find();
        }catch(err){
            console.log(err);
        }
    }

    static async getUserByEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }

    static async checkUser(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }
}

module.exports = UserServices;