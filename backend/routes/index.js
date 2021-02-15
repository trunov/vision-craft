const router = require("express").Router();

const users = require("./users");

const { validateUserLogin } = require("../middlewares/celebrateHandlers");

const { createUser, login } = require("../controllers/users");

router.post("/signin", validateUserLogin, login);

router.post("/signup", createUser);

router.use("/users", users);

module.exports = router;
