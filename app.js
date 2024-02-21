const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const {
  getUsers,
  getUserByUsername,
  postUser,
} = require("./Controllers/users.controller");
const {
  getTrips,
  getTripById,
  postTrip,
} = require("./Controllers/trips.controller");
const {
  mongoDBErrorHandler,
  serverErrorHandler,
} = require("./Controllers/errors.controller");
const { setTravel } = require("./Controllers/travel.controller");
const { setStay } = require("./Controllers/stay.controllers");
const {
  setActivity,
  deleteActivity,
} = require("./Controllers/activities.controller");
const { setMember } = require("./Controllers/members.controller");

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/users", getUsers);
app.get("/trips", getTrips);
app.get("/users/:username", getUserByUsername);
app.get("/trips/:trip_id", getTripById);

app.post("/trips", postTrip);
app.post("/users", postUser);

app.post("/trips/:trip_id/activities", setActivity);
app.post("/trips/:trip_id/members", setMember);

app.post("/trips/:trip_id/travel", setTravel);
app.post("/trips/:trip_id/stay", setStay);

app.delete("/trips/:trip_id/activities", deleteActivity);

app.use(mongoDBErrorHandler);
app.use(serverErrorHandler);

module.exports = server;
