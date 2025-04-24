const express = require("express");
const { getAboutInfo, updateOrCreateAboutInfo } = require("../../controller/about.controller");
const upload = require("../../utils/upload");
const authenticate = require("../../middleware/tokenVerify");
const aboutRouter = express.Router();

aboutRouter.get("/", getAboutInfo)
aboutRouter.put("/", authenticate, upload.single("image"), updateOrCreateAboutInfo)


module.exports = aboutRouter