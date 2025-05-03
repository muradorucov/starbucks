const express = require("express");
const {
    getCategoryList,
    createCategory,
    editCategory,
    deleteCategory,
    getSingleCategory
} = require("../../controller/category.controller");
const authenticate = require("../../middleware/tokenVerify");
const categoryRouter = express.Router();

categoryRouter.get("/", getCategoryList)
categoryRouter.get("/single/:id", authenticate, getSingleCategory)
categoryRouter.post("/", authenticate, createCategory)
categoryRouter.put("/:id", authenticate, editCategory)
categoryRouter.patch("/:id", authenticate, deleteCategory)


module.exports = categoryRouter