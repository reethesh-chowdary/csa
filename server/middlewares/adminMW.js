const jwt = require('jsonwebtoken');
const { jwt_admin_secret } = require("../config");

function adminAuth(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const response = jwt.verify(token, jwt_admin_secret);

        if (response) {
            req.adminid = response.creatorid;
            next(); // token is valid, proceed
        } else {
            return res.status(403).json({ message: "Invalid token" });
        }
    } catch (err) {
        console.error("Token verification error:", err.message);
        return res.status(403).json({ message: "Invalid token", error: err.message });
    }
}

module.exports = { adminAuth };
