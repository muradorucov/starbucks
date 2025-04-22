const express = require("express");
const {
    getContactList,
    createContact,
    changeStatusForContact
} = require("../../controller/contact.controller");
const authenticate = require("../../middleware/tokenVerify");

const contactRouter = express.Router();

contactRouter.get("/", authenticate, getContactList)
contactRouter.post("/", createContact)
contactRouter.patch("/:id", authenticate, changeStatusForContact)


module.exports = contactRouter