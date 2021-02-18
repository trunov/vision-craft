const jwt = require("jsonwebtoken");
const UnauthError = require("../errors/UnauthError");

const { JWT_SECRET } = require("../configs");

const extractBearerToken = (header) => header.replace("Bearer ", "");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthError("You need to be authorized"));
  }

  const token = extractBearerToken(authorization);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return next(new UnauthError("You need to be authorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = {
  auth,
  extractBearerToken
}