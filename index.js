const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//Import routes
const authRoute = require("./routes/auth");
const boardRoute = require("./routes/board");

dotenv.config();
mongoose.set("useFindAndModify", false);

//Connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to DB");
  }
);

//Middleware
app.use(express.json());

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/board", boardRoute);

app.listen(3000, () => console.log("Server up and running"));
