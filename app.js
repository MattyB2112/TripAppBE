const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const {
  getUser,
  getUserByUsername,
  postUser,
} = require("./Controllers/users.controller");
const {
  getTrip,
  getTripById,
  postTrip,
  setActivity,
  setMembers,
} = require("./Controllers/trips.controller");
const {
  mongoDBErrorHandler,
  serverErrorHandler,
} = require("./Controllers/errors.controller");
const { setTravel } = require("./Controllers/travel.controller");
const { setStay } = require("./Controllers/stay.controllers");

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/user", getUser);
app.get("/trip", getTrip);
app.get("/users/:username", getUserByUsername);
app.get("/trip/:trip_id", getTripById);

app.post("/trip", postTrip);
app.post("/user", postUser);

app.patch("/trip/:trip_id/activity", setActivity);
app.patch("/trip/:trip_id/member", setMembers);

app.patch("/trip/:trip_id/travel", setTravel);
app.patch("/trip/:trip_id/stay", setStay);

app.use(mongoDBErrorHandler);
app.use(serverErrorHandler);

module.exports = server;
