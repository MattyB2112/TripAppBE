const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const { User, Trip } = require("./db/data/dataSchemas");

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send({ users: users });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/trip", async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).send({ trips: trips });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = server;
