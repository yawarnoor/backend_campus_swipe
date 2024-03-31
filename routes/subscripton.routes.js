const router = require("express").Router();
const SubscriptionController = require('../controller/subscripton.controller.js');

router.get("/subscriptions",SubscriptionController.get_subscriptions);

router.post("/subscriptions",SubscriptionController.post_subscriptions);

router.get("/subscriptions/:cms_id", SubscriptionController.getSubscriptionsByCMS);

router.put("/subscriptions/:cms_id", SubscriptionController.updateSubscriptionDuration);




module.exports = router;