const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const { getUsers } = require("./Controllers/users.controller");
const { getTrips } = require("./Controllers/trips.controller");

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/user", getUsers);

app.get("/trip", getTrips);

module.exports = server;
