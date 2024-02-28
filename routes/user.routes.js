const router = require("express").Router();
const UserController = require('../controller/user.controller');
const User = require('../models/user.model');

router.post("/register",UserController.register);

router.post("/login", UserController.login);

router.get("/users",UserController.users);

router.get("/user/:id",UserController.user_id);

// API endpoint to get team data
router.get("/team",UserController.team);

router.post('/checkSubscription', async (req, res) => {
    try {
      const { cms_id } = req.body;
  
      // Find the user based on CMS_ID
      const user = await User.findOne({ cms_id });
  
      if (user) {
        // User found, send subscription status
        res.json({ is_subscribed: user.is_subscribed });
      } else {
        // User not found
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;