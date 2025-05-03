const express = require("express");
const {
    getProductList,
    getSingleProduct,
    createProduct,
    editProduct,
    changeStatusForProduct
} = require("../../controller/product.controller");
const authenticate = require("../../middleware/tokenVerify");
const upload = require("../../utils/upload");

const productRouter = express.Router();

productRouter.get("/category/:categoryId", getProductList)
productRouter.get("/single/:id", getSingleProduct)
productRouter.post("/", authenticate, upload.single("image"), createProduct)
productRouter.put("/:id", editProduct)
productRouter.patch("/:id", changeStatusForProduct)


module.exports = productRouter