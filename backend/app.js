const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./configs");
const routes = require("./routes/index");
const NotFoundError = require("./errors/NotFoundError");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.use("*", () => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
