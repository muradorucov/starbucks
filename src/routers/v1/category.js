const express = require("express");
const {
    getCategoryList,
    createCategory,
    editCategory,
    deleteCategory,
    getSingleCategory,
    changeStatusForCategory,
    getCategoryListForAdmin
} = require("../../controller/category.controller");
const authenticate = require("../../middleware/tokenVerify");
const categoryRouter = express.Router();

categoryRouter.get("/", getCategoryList)
categoryRouter.get("/for-admin", authenticate, getCategoryListForAdmin)
categoryRouter.get("/single/:id", authenticate, getSingleCategory)
categoryRouter.post("/", authenticate, createCategory)
categoryRouter.put("/:id", authenticate, editCategory)
categoryRouter.patch("/:id", authenticate, changeStatusForCategory)
categoryRouter.delete("/:id", authenticate, deleteCategory)


module.exports = categoryRouter