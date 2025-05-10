const { default: mongoose } = require("mongoose");
const contactModel = require("../model/contact.model.js");
const sendMail = require("../utils/sendMail.js");

const getContactList = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";
    const sort = req.params.sort;
    // sort || "createdAt"; || email || "fullName" || "subject" 

    try {

        const query = search
            ? {
                $or: [
                    { fullName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } },
                    { message: { $regex: search, $options: "i" } }
                ]
            }
            : {};



        const totalCount = await contactModel.countDocuments(query);
        const contactsList = await contactModel
            .find(query)
            .sort({
                [sort || "createdAt"]: -1
            })
            .limit(limit)
            .skip(skip)
            .lean();

        res.status(200).json({
            message: "Contact list fetched successfully",
            contactList: contactsList,
            totalLength: totalCount,
            limit,
            totalPage: Math.ceil(totalCount / limit),
            currentpage: page,
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });

    }
}
const createContact = async (req, res) => {
    const { fullName, phone, email, subject, message } = req.body;
    try {
        if (!fullName && !phone && !email && !subject && !message) {
            return res.status(400).json({
                message: "Please provide all required fields"
            })
        }
        const newContact = {
            fullName,
            phone,
            email,
            subject,
            message
        }
        const contact = await contactModel.create(newContact);
        if (!contact) {
            return res.status(400).json({
                message: "Contact not created"
            })
        }


        const mailInfo = await sendMail(newContact);
        console.log(mailInfo);

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