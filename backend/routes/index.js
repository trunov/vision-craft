const router = require("express").Router();

const users = require("./users");

const { validateUserLogin } = require("../middlewares/celebrateHandlers");

const { createUser, login } = require("../controllers/users");

router.post("/login", validateUserLogin, login);

router.post("/register", createUser);

router.use("/users", users);

module.exports = router;
