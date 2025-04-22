const mongoose = require('mongoose');
const aboutSchema = require('../schema/about.schema');

const aboutModel = mongoose.model("About", aboutSchema);


module.exports = aboutModel;