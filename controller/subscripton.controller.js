const SubscriptionServices = require('../services/subscription.services.js');

exports.post_subscriptions = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const {cms_id, duration } = req.body;
        const add = await SubscriptionServices.addSubscription(cms_id, duration)

        res.json({ status: true, success: 'Subscription Added successfully' });

    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.get_subscriptions = async (req, res, next) => {
    try {
        const subscriptions = await SubscriptionServices.getAllSubscriptions();
        res.status(200).json(subscriptions);
    }
    catch (err) {
    console.log("---> err -->", err);
    next(err);
}
}

exports.getSubscriptionsByCMS = async (req, res, next) => {
    try {
        const cmsId  = req.params.cms_id;
        const subscriptions = await SubscriptionServices.getSubscriptionsByCMS(cmsId);
        res.status(200).json(subscriptions);
    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.updateSubscriptionDuration = async (req, res, next) => {
    try {
        const cmsID = req.params.cms_id;
        const { duration } = req.body;

        // Find the subscription based on id and update the duration
        const subscription = await SubscriptionServices.updateSubscriptionDuration(cmsID, duration);
        res.status(200).json(subscription);
    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
};