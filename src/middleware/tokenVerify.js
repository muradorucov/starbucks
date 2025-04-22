const jwt = require('jsonwebtoken');
const config = require('../config');

const authenticate = (req, res, next) => {
    try {
        const { accessToken } = req.cookies;
        if (!accessToken) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }

        const decod = jwt.verify(accessToken, `${config.secret}`);
        req.user = decod
        next()

    } catch (error) {
        res.status(403).json({
            message: 'Invalid token or expired'
        })
    }

}

module.exports = authenticate