const express = require("express");
const {
    getProductList,
    getSingleProduct,
    createProduct,
    editProduct,
    changeStatusForProduct
} = require("../../controller/product.controller");

const productRouter = express.Router();

productRouter.get("/category/:subcategory", getProductList)
productRouter.get("/single/:id", getSingleProduct)
productRouter.post("/", createProduct)
productRouter.put("/:id", editProduct)
productRouter.patch("/:id", changeStatusForProduct)


module.exports = productRouter