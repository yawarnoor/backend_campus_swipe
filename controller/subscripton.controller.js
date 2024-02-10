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