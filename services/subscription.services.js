const SubscriptionModel = require("../models/subscription.model.js");

class SubscriptionServices {

    static async addSubscription(cms_id, duration) {
        try{
                console.log("---- Device-----Location --",cms_id, duration);
                
                const createsubscription = new SubscriptionModel({cms_id, duration});
                return await createsubscription.save();
        }catch(err){
            throw err;
        }
    }

    static async getTransactionsByCMS(cms_id){
        try{
            return await SubscriptionModel.find({cms_id});
        }catch(err){
            console.log(err);
        }
    }


    static async getAllSubscriptions(){
        try{
            return await SubscriptionModel.find();
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = SubscriptionServices;