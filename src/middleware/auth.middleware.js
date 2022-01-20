const req = require("express/lib/request");
const jwt = require("jsonwebtoken");
const User = require("../models/user.Model");


const auth = {
    user: (req, res, next) => {
        try {
            const { authorization } = req.headers;
            const token = authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            req.user = user;
            next();
        } catch (err) {
            return res.status(400).json({ message: "Authentication failure!" })

        }
    },

    admin: async (req, res, next) => {
        try {
            const user = await User.findOne({
                _id: req.user.id
            })
            if (user.role !== 'admin' && user.email === req.user.email) { // assuming you pass user info
                return res.status(403).json({
                    status: 'fail',
                    message: 'Unauthorized to access this route'
                })
            }
            next();

        } catch (error) {
            return res.status(400).json({ message: "Authentication failure!" })
        }
    }
}


module.exports = auth;