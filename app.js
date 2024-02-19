const express = require("express");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const app = express();
const http = require("http");
const User = require("./db/data/testData");
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

module.exports = server;
