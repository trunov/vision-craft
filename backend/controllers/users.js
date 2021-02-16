const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { db, JWT_SECRET } = require("../configs");

module.exports.getUser = (req, res) => {
  db.query(
    "SELECT name, email FROM `users` WHERE id = ?",
    [req.user._id],
    (error, results) => {
      if (error) {
        res.send({ message: error });
      } else {
        res.send(results);
      }
    }
  );
};

module.exports.createUser = (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        res.send({ message: error });
      } else if (results.length > 0) {
        res.send({ message: "Email already registered" });
      } else {
        let hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users SET ?",
          { name: name, email: email, password: hashedPassword },
          (error, results) => {
            if (error) {
              res.send({ message: error.sqlMessage });
            } else {
              res.send({ message: results.insertId });
            }
          }
        );
      }
    }
  );
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      const passwordComparison = await bcrypt.compare(
        password,
        results[0].password
      );
      if (!results || !passwordComparison) {
        res.status(401).send({ message: "Email or Password is incorrect" });
      } else {
        const id = results[0].id;
        const token = jwt.sign({ _id: id }, JWT_SECRET, { expiresIn: "7d" });
        res.send({ token });
      }
    }
  );
};
