const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const {
  getUser,
  getUserByUsername,
  postUser,
} = require("./Controllers/users.controller");
const { getTrip } = require("./Controllers/trips.controller");
const {
  mongoDBErrorHandler,
  serverErrorHandler,
} = require("./Controllers/errors.controller");

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/user", getUser);
app.get("/trip", getTrip);
app.get("/users/:username", getUserByUsername);

app.post("/user", postUser);

app.use(mongoDBErrorHandler);
app.use(serverErrorHandler);

module.exports = server;
