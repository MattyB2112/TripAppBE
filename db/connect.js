const mongoose = require("mongoose");

const User = require("../db/data/testData");
const URITest = "mongodb://localhost:27017/TripAppTEST";
const URIProd = "mongodb://localhost:27017/TripApp";
const db = mongoose.connect(URIProd);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

// seedDB().then(() => {
//   mongoose.connection.close();
// });
