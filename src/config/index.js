const { mongo } = require('mongoose');

require('dotenv').config();

const config = {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    secret: process.env.SECRET_KEY,
    rsecret: process.env.REFRESH_SECRET_KEY,
    mongo_url: process.env.MONGO_URL,
    password: process.env.MONGO_PASSWORD,
    email: process.env.EMAIL,
    email_pass: process.env.EMAIL_PASS
}

module.exports = config