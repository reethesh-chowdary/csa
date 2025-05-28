const jwt = require('jsonwebtoken');
const { jwt_user_secret } = require("../config");

function userAuth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, jwt_user_secret);
        req.userid = decoded.userid;
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = { userAuth };
