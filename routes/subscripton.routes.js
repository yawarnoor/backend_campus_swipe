const router = require("express").Router();
const SubscriptionController = require('../controller/subscripton.controller.js');
const SubscriptionServices = require("../services/subscription.services");


router.get("/subscriptions",SubscriptionController.get_subscriptions);

router.post("/subscriptions",SubscriptionController.post_subscriptions);

router.get("/subscriptions/:cms_id", SubscriptionController.getSubscriptionsByCMS);

router.put("/subscriptions/:cms_id", SubscriptionController.updateSubscriptionDuration);

// Route to set subscription date
router.post("/setSubscriptionDate", async (req, res) => {
    try {
        const { cms_id } = req.body;
        const subscription = await SubscriptionServices.setSubscriptionDate(cms_id);
        res.json({ success: true, subscription });
    } catch (error) {
        console.error("Error setting subscription date:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports = router;