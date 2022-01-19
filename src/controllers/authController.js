
const User = require("../models/user.Model");
const authRouter = require("../routes/authRouter");
const generateToken = require("../utils/generateToken");

const authController = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "The email Already exists." })
            }

            const newUser = new User({
                name, email, password
            });
            const user = await newUser.save();

            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
            const access_token = generateToken({user: payload });
            res.json({user, token: access_token,  });
        } catch (error) {

            return res.status(500).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "No user with this email!" })
            }

            const isValidPassword = await user.isValidPassword(req.body.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: "Incorrect email or password!" })
            }
            const payload = {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
            const access_token = generateToken({ payload });

            res.json({ user, token: access_token });

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
}

module.exports = authController;
