const TransactionModel = require("../models/transaction.model");
const UserModel = require('../models/user.model');
const DeviceModel = require('../models/device.model');

class TransactionServices {

    static async addTransaction(cms_id, device_id, status) {
        try {
            // Check if the user with the provided cms_id exists
            const user = await UserModel.findOne({ cms_id: cms_id });
            if (!user) {
                throw new Error(`User ${cms_id} not found`);
            }
    
            // Check if the device with the provided device_id exists
            const device = await DeviceModel.findOne({ device_id: device_id });
            if (!device) {
                throw new Error('Device not found');
            }
    
            const createTransaction = new TransactionModel({ cms_id, device_id, status });
            return await createTransaction.save();
        } catch (err) {
            throw err;
        }
    }
    
    

    static async getAllTransactions(){
        try{
            return await TransactionModel.find();
        }catch(err){
            console.log(err);
        }
    }

    static async getTransactionsByCMS(cms_id){
        try{
            return await TransactionModel.find({cms_id});
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = TransactionServices;