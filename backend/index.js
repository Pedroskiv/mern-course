// Import libraries
const express    = require("express");
const mongoose   = require("mongoose");
const morgan     = require("morgan");
const bodyParser = require("body-parser");
const cors       = require("cors");

// Use method libs.
const app = express();
require("dotenv").config();

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// DB Setup
mongoose.connect(process.env.DATABASE,
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => { console.log("Conexión de base de datos exitosa")});

// Routes Setup
app.use("/api/category", require("./routes/category"));
app.use("/api/videogame", require("./routes/videogame"));
app.use("/api/auth", require("./routes/auth"));

// Listen to port
const port = process.env.PORT;

app.listen(port, () =>
{
    console.log(`Servidor de videojuegos MERN está siendo ejecutado en el puerto ${port}`);
});
