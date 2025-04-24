const { default: mongoose } = require("mongoose");
const userSchema = require("../schema/user.schema");

const userModel = mongoose.model("User", userSchema, "users");

module.exports = userModel;