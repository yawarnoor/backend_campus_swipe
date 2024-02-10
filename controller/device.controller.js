const DeviceServices = require('../services/device.service');


exports.post_devices = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const {device_id, location } = req.body;
        const add = await DeviceServices.addDevice(device_id, location)

        res.json({ status: true, success: 'Device Added successfully' });

    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}
exports.get_devices = async (req, res, next) => {
    try {
        const devices = await DeviceServices.getAllDevices();
        res.status(200).json(devices);
    }
    catch (err) {
    console.log("---> err -->", err);
    next(err);
}
}