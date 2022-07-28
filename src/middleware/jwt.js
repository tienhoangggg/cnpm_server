const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const verify = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.idUser = decoded.idUser;
        next();
    } catch (err) {
        return res.status(401).send('Invalid token.');
    }
}
exports.verify = verify;