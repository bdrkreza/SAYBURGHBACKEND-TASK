const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    if (process.env.ACCESS_TOKEN_SECRET !== undefined) {
        return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });
    }
}

module.exports = generateToken;