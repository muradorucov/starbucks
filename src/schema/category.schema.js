const { default: mongoose } = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    isParent: {
        type: Boolean,
        default: false
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });


module.exports = categorySchema