const router = require("express").Router();
const UserController = require('../controller/user.controller');

router.post("/register",UserController.register);

router.post("/login", UserController.login);

router.get("/users",UserController.users);

// API endpoint to get team data
router.get("/team",UserController.team);

module.exports = router;