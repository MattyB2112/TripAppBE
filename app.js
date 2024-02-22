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
  deleteTrip,
} = require("./Controllers/trips.controller");
const {
  mongoDBErrorHandler,
  serverErrorHandler,
} = require("./Controllers/errors.controller");
const { setTravel, deleteTravel } = require("./Controllers/travel.controller");
const { setStay, deleteStay } = require("./Controllers/stay.controllers");
const {
  setActivity,
  deleteActivity,
  patchActivity,
} = require("./Controllers/activities.controller");
const { setMember, deleteMember } = require("./Controllers/members.controller");

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

app.patch("/trips/:trip_id/activities/:activity_id", patchActivity);

app.delete("/trips/:trip_id/activities/:activity_id", deleteActivity);
app.delete("/trips/:trip_id/stay/:stay_id", deleteStay);
app.delete("/trips/:trip_id/travel/:travel_id", deleteTravel);
app.delete("/trips/:trip_id/members", deleteMember);
app.delete("/trips/:trip_id/", deleteTrip);

app.use(mongoDBErrorHandler);
app.use(serverErrorHandler);

module.exports = server;
