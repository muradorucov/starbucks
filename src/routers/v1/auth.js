const express = require("express");
const { login, currentUser } = require("../../controller/auth.controller");
const authenticate = require("../../middleware/tokenVerify");
const authRouter = express.Router();


authRouter.post("/login", login);
authRouter.get("/current-user", authenticate, currentUser)

module.exports = authRouter;