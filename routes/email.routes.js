const router = require("express").Router();
const EmailController = require('../controller/email.controller');

router.post("/sendEmail",EmailController.sendEmail);

module.exports = router;