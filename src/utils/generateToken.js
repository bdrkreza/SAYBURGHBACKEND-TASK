const jwt = require("jsonwebtoken");


// Generate a json web token for a user
const generateToken = (user) => {
  if (process.env.JWT_SECRET !== undefined) {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
};

module.exports = generateToken;


