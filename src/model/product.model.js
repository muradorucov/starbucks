const { default: mongoose } = require("mongoose");
const productSchema = require("../schema/product.schema");

const productModel = mongoose.model("Product", productSchema, "products");

module.exports = productModel;