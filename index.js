const express = require('express');
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require(`./db/connect`);

const app = express();

db.createConnection();

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configurar sesión y cookies
app.use(cookieParser());
app.use(
  session({
    secret: "secreto", // una cadena aleatoria para la encriptación
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 }, // tiempo de expiración de la cookie: 1 hora
  })
);


app.use("/api/auth", require("./routes/userRoutes"));
app.use("/api", require("./routes/eventRoutes"));


app.listen(process.env.PORT, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("app running!");
});
