const TransactionModel = require("../models/transaction.model");

class TransactionServices {

    static async addTransaction(cms_id, device_id, status) {
        try{
                console.log("-----CMS --- Device-----",cms_id, device_id);
                
                const createTransaction = new TransactionModel({cms_id, device_id, status});
                return await createTransaction.save();
        }catch(err){
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