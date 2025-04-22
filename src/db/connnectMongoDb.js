const config = require("../config");
const mongoose = require("mongoose");

const url = config.mongo_url.replace("<db_password>", config.password);

const connectMongoDb = async () => {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};


module.exports = connectMongoDb;