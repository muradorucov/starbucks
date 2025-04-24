const { default: mongoose } = require("mongoose");
const contactSchema = require("../schema/contact.schema");

const contactModel = mongoose.model("Contact", contactSchema, "contacts");


module.exports = contactModel;