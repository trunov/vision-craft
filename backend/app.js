const express = require("express");
const mysql = require("mysql");
const { errors } = require('celebrate');
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./configs");
const routes = require("./routes/index");
const NotFoundError = require("./errors/NotFoundError");

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodejs',
  port: '8889'
});

db.connect((err) => {
  if(err) {
    console.log(err);
  } else {
    console.log("mysql connected");
  }
})

app.use(routes);

app.use("*", () => {
  throw new NotFoundError("Запрашиваемый ресурс не найден");
});

app.use(errors());
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message } = err;

//   res.status(statusCode).send({
//     message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
//   });
//   next();
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
