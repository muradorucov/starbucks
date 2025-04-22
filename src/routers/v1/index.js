const express = require("express");
const aboutRouter = require("./about");
const categoryRouter = require("./category");
const contactRouter = require("./contact");
const productRouter = require("./product");
const authRouter = require("./auth");
const v1Router = express.Router();

v1Router.use("/about", aboutRouter);
v1Router.use("/category", categoryRouter);
v1Router.use("/contact", contactRouter);
v1Router.use("/product", productRouter);
v1Router.use("/auth", authRouter)


module.exports = v1Router;