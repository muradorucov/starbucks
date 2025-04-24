const { default: mongoose } = require("mongoose");

const contactSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    isSee:{
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = contactSchema;