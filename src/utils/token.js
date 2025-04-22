const config = require("../config");
const jwt = require('jsonwebtoken');


const generateAccessToken = (data) => {
    return jwt.sign(data, config.secret, { expiresIn: '1h' });
}


const generateRefreshToken = (data) => {
    return jwt.sign(data, config.rsecret, { expiresIn: '10d' });
}


module.exports = {
    generateAccessToken,
    generateRefreshToken
}