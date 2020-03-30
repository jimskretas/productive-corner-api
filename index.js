const express = require("express");
var cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//Import routes
const authRoute = require("./routes/auth");
const boardRoute = require("./routes/board");

var PORT = process.env.PORT || 3000;

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
app.use(cors({ credentials: true }));

//Route middlewares
app.use("/api/user", authRoute);
app.use("/api/board", boardRoute);

app.listen(PORT, () => console.log("Server up and running"));
