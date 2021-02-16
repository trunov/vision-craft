const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../configs");

const extractBearerToken = (header) => header.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401).send({ message: "You need to be authorized" });
  }

  const token = extractBearerToken(authorization);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      res.status(403).send({ message: "Token is Invalid" });
    }
    req.user = user;
    next();
  });
};
