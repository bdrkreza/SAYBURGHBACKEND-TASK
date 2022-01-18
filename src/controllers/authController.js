const User = require("../models/User.Model");
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
            await newUser.save();
            const accessToken = generateToken(newUser._id);
            res.json({ accessToken });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}


module.exports = authController;
