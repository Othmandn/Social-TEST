const express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

require("./database");
const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
