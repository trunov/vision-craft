const router = require('express').Router();

const users = require('./users');

const {
  createUser,
  login,
} = require('../controllers/users');

router.get('/signin', login);

router.get('/signup', createUser);

router.use('/users', users);


module.exports = router;
