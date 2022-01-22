// module `validate-tokens`
const { verify } = require("jsonwebtoken");

function validateAccessToken(token) {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    return null;
  }
}


