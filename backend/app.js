const express = require("express");
const { errors } = require("celebrate");
const bodyParser = require("body-parser");
const cors = require("cors");
const { db, PORT } = require("./configs");
const routes = require("./routes/index");
const NotFoundError = require("./errors/NotFoundError");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("mysql connected");
});

app.use(routes);

app.use("*", () => {
  throw new NotFoundError("The requested resource is not found");
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
