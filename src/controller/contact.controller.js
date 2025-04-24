const { default: mongoose } = require("mongoose");
const contactModel = require("../model/contact.model.js");

const getContactList = async (req, res) => {
    try {
        const contacts = await contactModel.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            message: "Contact list fetched successfully",
            contacts
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });

    }
}
const createContact = async (req, res) => {
    const { fullName, phone, subject, message } = req.body;
    try {
        if (!fullName && !phone && !subject && !message) {
            return res.status(400).json({
                message: "Please provide all required fields"
            })
        }
        const newContact = {
            fullName,
            phone,
            subject,
            message
        }
        const contact = await contactModel.create(newContact);
        if (!contact) {
            return res.status(400).json({
                message: "Contact not created"
            })
        }
        res.status(201).json({
            message: "Contact created successfully",
            contact
        });

    } catch (error) {

        console.error("Error creating contact:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}
const changeStatusForContact = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid contact ID"
            })
        }
        // Find the contact by ID
        const contact = await contactModel.findById(id);

        if (!contact) {
            return res.status(404).json({
                message: "Contact not found"
            })
        }
        contact.isSee = !contact.isSee;
        await contact.save();

        res.status(200).json({
            message: "Contact status changed successfully",
            contact
        });

    } catch (error) {
        console.error("Error changing status for contact:", error);
        res.status(500).json({
            message: "Internal server error"
        });

    }

}


module.exports = {
    getContactList,
    createContact,
    changeStatusForContact
}