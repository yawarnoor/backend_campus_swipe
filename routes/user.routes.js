const router = require("express").Router();
const UserController = require('../controller/user.controller');

router.post("/register",UserController.register);

router.post("/login", UserController.login);

router.get("/users",UserController.users);

router.get("/user/:id",UserController.user_id);

// API endpoint to get team data
router.get("/team",UserController.team);

module.exports = router;