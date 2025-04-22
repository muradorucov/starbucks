const express = require("express");
const { getAboutInfo, updateAboutInfo } = require("../../controller/about.controller");
const aboutRouter = express.Router();

aboutRouter.get("/", getAboutInfo)
aboutRouter.put("/", updateAboutInfo)


module.exports = aboutRouter