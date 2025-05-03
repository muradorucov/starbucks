const { default: mongoose } = require("mongoose");
const categorySchema = require("../schema/category.schema");

const categoryModel = mongoose.model("Category", categorySchema, "categories");

module.exports = categoryModel;