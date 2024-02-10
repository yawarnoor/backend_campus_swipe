const router = require("express").Router();
const DeviceController = require('../controller/device.controller');

router.get("/devices",DeviceController.get_devices);

router.post("/devices",DeviceController.post_devices);


module.exports = router;