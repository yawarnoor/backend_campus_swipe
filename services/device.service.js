const DeviceModel = require("../models/device.model");

class DeviceServices {

    static async addDevice(device_id, location) {
        try{
                console.log("---- Device-----Location --",device_id, location);
                
                const createDevice = new DeviceModel({device_id, location});
                return await createDevice.save();
        }catch(err){
            throw err;
        }
    }

    static async getAllDevices(){
        try{
            return await DeviceModel.find();
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = DeviceServices;