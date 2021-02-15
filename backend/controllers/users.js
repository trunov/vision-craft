

// const NotFoundError = require('../errors/NotFoundError');
// const BadRequestError = require('../errors/BadRequestError');
// const UnauthError = require('../errors/UnauthError');
// const UniqueError = require('../errors/UniqueError');

module.exports.getUser = (req, res, next) => {
  res.send("You reaches /users/me page")
};

module.exports.createUser = (req, res, next) => {
  res.send("createUser")
};

module.exports.login = (req, res, next) => {
  res.send("login")
};