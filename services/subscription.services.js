const SubscriptionModel = require("../models/subscription.model.js");

class SubscriptionServices {

    static async addSubscription(cms_id, duration) {
        try {
            console.log("---- Device-----Location --", cms_id, duration);
            const createsubscription = new SubscriptionModel({ cms_id, duration });
            return await createsubscription.save();
        } catch (err) {
            throw err;
        }
    }

    static async getSubscriptionsByCMS(cms_id) {
        try {
            return await SubscriptionModel.find({ cms_id });
        } catch (err) {
            throw err;
        }
    }

    static async getAllSubscriptions() {
        try {
            return await SubscriptionModel.find();
        } catch (err) {
            throw err;
        }
    }

    static async updateSubscriptionDuration(cms_id, duration) {
        try {
            // Find the subscription based on cms_id and update the duration
            const subscription = await SubscriptionModel.findOneAndUpdate({ cms_id }, { duration }, { new: true });
    
            if (subscription) {
                // Subscription found and duration updated
                return subscription;
            } else {
                // Subscription not found
                throw new Error('Subscription not found');
            }
        } catch (err) {
            throw err;
        }
    }
    
}



module.exports = SubscriptionServices;
