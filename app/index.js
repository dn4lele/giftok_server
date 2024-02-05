const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const usersRouter = require("./routes/users");
const postssRouter = require("./routes/posts");
const commentssRouter = require("./routes/comments");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", usersRouter);

app.use("/api/posts", postssRouter);

app.use("/api/comments", commentssRouter);

module.exports = app;
