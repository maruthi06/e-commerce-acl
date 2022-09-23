const jwt = require("jsonwebtoken");

const secret = process.env["JWT_SECRET"] || "&sdad*89^%";

function generateToken(payload) {
    const token = jwt.sign(payload, secret)
    return token;
}

function validateToken(token) {
    const data = jwt.verify(token, secret);
    return data;
}

module.exports = { generateToken, validateToken };