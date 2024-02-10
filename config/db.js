const mongoose = require('mongoose');

const connection = mongoose.createConnection(`mongodb+srv://admin:admin@cluster0.axl2pcd.mongodb.net/?retryWrites=true&w=majority`).on('open',()=>{console.log("MongoDB Connected");}).on('error',()=>{
    console.log("MongoDB Connection error");
});

module.exports = connection;