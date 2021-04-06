require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const router = require("./Routers/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
mongoose.connect("mongodb://localhost:27017/portal-article", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("database connected");
});

app.use(router);

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
