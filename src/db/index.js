const { default: mongoose } = require("mongoose");
const config = require("../config");
const url = config.mongo_url.replace("pass", config.password);

const mongoDbConnection = async () => {
    try {
        await mongoose.connect(url)
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}


module.exports = mongoDbConnection;