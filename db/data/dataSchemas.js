const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

const activitySchema = new mongoose.Schema({
  name: String,
  startdate: String,
  info: String,
});

const travelSchema = new mongoose.Schema({
  startdate: String,
  leavetime: String,
  arrivedate: String,
  arrivetime: String,
  type: String,
  info: String,
});

const staySchema = new mongoose.Schema({
  startdate: String,
  enddate: String,
  name: String,
  type: String,
  info: String,
});

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startdate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  enddate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  admin: {
    type: String,
    default: "",
    required: true,
  },
  travel: {
    type: [travelSchema],
    default: [],
  },
  stay: {
    type: [staySchema],
    default: [],
  },
  members: {
    default: [],
    type: Array,
  },
  // [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  // ],
  activities: {
    type: [activitySchema],
    default: [],
  },
});

const Trip = mongoose.model("Trip", tripSchema);

const chatSchema = new mongoose.Schema({
  messageSender: {
    type: String,
    required: true,
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  messageContent: {
    type: String,
    required: true,
  },
  messageDate: {
    type: Date,
    default: new Date(),
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { User, Trip, Chat };
