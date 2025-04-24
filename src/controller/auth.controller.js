const config = require("../config");
const userModel = require("../model/user.model");
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const login = async (req, res) => {
    const { username, password } = req.body;

    try {

        const user = await userModel.findOne({ username });
        const match = await bcrypt.compare(password, user.password)

        if (!user || !match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const accessToken = generateAccessToken({ username: user.username });
        const refreshToken = generateRefreshToken({ username: user.username });
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            secure: config.node_env === "production",
            sameSite: "none",
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            secure: config.node_env === "production",
            sameSite: "none",
        })
        res.json({
            message: "Login successful",
            user:{
                username: user.username
            }
        });
    } catch (error) {
        console.log("Test error", error);
        res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

const currentUser = (req, res) => {
    const user = req.user;
    try {
        res.status(200).json({
            message: "user is authorized",
            user
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error
        })
    }
}

module.exports = {
    login,
    currentUser
}