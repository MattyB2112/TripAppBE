require("dotenv").config();
const express = require("express");
// //// const sz = require("socket.io");
const http = require("http");
const { createSocketIOServer } = require("./socket");
const path = require("path");
// //// const socketIO = require("socket.io");

const cors = require("cors");

const connectDB = require("./db/connect");
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
  patchTrip,
} = require("./Controllers/trips.controller");
const {
  mongoDBErrorHandler,
  serverErrorHandler,
} = require("./Controllers/errors.controller");
const {
  setTravel,
  deleteTravel,
  patchTravel,
} = require("./Controllers/travel.controller");
const {
  setStay,
  deleteStay,
  patchStay,
} = require("./Controllers/stay.controllers");
const {
  setActivity,
  deleteActivity,
  patchActivity,
} = require("./Controllers/activities.controller");
const { setMember, deleteMember } = require("./Controllers/members.controller");
const { getMessages } = require("./Controllers/messages.controller");

// connectDB();
const app = express();
const server = http.createServer(app);
const io = createSocketIOServer(server);

app.use(cors());

app.use(
  "/socket.io",
  express.static(__dirname + "/node_modules/socket.io/client-dist")
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/users", getUsers);
app.get("/trips", getTrips);
app.get("/users/:username", getUserByUsername);
app.get("/trips/:trip_id", getTripById);
app.get("/trips/:trip_id/messages", getMessages);

app.post("/trips", postTrip);
app.post("/users", postUser);
app.post("/trips/:trip_id/activities", setActivity);
app.post("/trips/:trip_id/members", setMember);
app.post("/trips/:trip_id/travel", setTravel);
app.post("/trips/:trip_id/stay", setStay);

app.patch("/trips/:trip_id/activities/:activity_id", patchActivity);
app.patch("/trips/:trip_id/travel/:travel_id", patchTravel);
app.patch("/trips/:trip_id/stay/:stay_id", patchStay);
app.patch("/trips/:trip_id", patchTrip);

app.delete("/trips/:trip_id/activities/:activity_id", deleteActivity);
app.delete("/trips/:trip_id/stay/:stay_id", deleteStay);
app.delete("/trips/:trip_id/travel/:travel_id", deleteTravel);
app.delete("/trips/:trip_id/members", deleteMember);
app.delete("/trips/:trip_id/", deleteTrip);

app.use("/", (req, res) => {
  return res.json({
    message: "Welcome to the trip app API!",
  });
});

app.use(mongoDBErrorHandler);
app.use(serverErrorHandler);

process.on("unhandledRejection", (error, promise) => {
  console.log(`Logged Error: ${error}`);
  server.close(() => process.exit(1));
});

module.exports = { app, server, io };
