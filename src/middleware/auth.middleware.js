const jwt = require("jsonwebtoken");
const User = require("../models/user.Model");


const auth = {

    //Middleware used to protect routes from unauthorized users
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

    //Middleware used to protect routes from users who are not flagged as admin
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
    },
};


module.exports = auth;