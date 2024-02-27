const express = require("express");
//const socketIO = require("socket.io");
const http = require("http");
const { createSocketIOServer } = require('./socket');
const path = require("path");
const cors = require('cors');
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
const io = createSocketIOServer(server);

app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io/client-dist'));

const allowedOrigins = [
  'http://127.0.0.1:5500'
];
app.use(cors({
  origin: allowedOrigins,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

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

module.exports = { server, app, io };
