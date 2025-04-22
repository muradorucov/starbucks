const express = require("express");
const {
    getCategoryList,
    createCategory,
    editCategory,
    deleteCategory
} = require("../../controller/category.controller");
const categoryRouter = express.Router();

categoryRouter.get("/", getCategoryList)
categoryRouter.post("/", createCategory)
categoryRouter.put("/:id", editCategory)
categoryRouter.patch("/:id", deleteCategory)


module.exports = categoryRouter