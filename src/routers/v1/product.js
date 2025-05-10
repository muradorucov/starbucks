const express = require("express");
const {
    getProductList,
    getSingleProduct,
    createProduct,
    editProduct,
    changeStatusForProduct,
    getAllProductList,
    getSingleProductForAdmin,
    deleteProduct
} = require("../../controller/product.controller");
const authenticate = require("../../middleware/tokenVerify");
const upload = require("../../utils/upload");

const productRouter = express.Router();

productRouter.get("/", getAllProductList)
productRouter.get("/category/:categoryId", getProductList)
productRouter.get("/single/:id", getSingleProduct)
productRouter.get("/single-foradmin/:id", authenticate, getSingleProductForAdmin)
productRouter.post("/", authenticate, upload.single("image"), createProduct)
productRouter.put("/:id", authenticate, upload.single("image"), editProduct)
productRouter.patch("/:id", authenticate, changeStatusForProduct)
productRouter.delete("/:id", authenticate, deleteProduct)


module.exports = productRouter