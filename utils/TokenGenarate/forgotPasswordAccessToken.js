//generate Forgot password token

const jwt = require("jsonwebtoken");

const forgotPasswordAccessToken = (payload) => {
    console.log("payload", payload);

    return jwt.sign(payload, process.env.FORGOT_PASSWORD_TOKEN_SECRET, {
        expiresIn: "10m",
    });
}

module.exports = { forgotPasswordAccessToken };