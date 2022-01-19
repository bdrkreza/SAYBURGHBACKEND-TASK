const jwt = require("jsonwebtoken");


const generateToken = (user) => {
  if (process.env.JWT_SECRET !== undefined) {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
};

module.exports = generateToken;


