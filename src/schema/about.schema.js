const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    })

module.exports = aboutSchema