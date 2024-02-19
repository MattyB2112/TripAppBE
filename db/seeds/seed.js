const mongoose = require("mongoose");
const User = require("../data/testData");

const URITest = "mongodb://localhost:27017/TripAppTEST";
const db = mongoose.connect(URITest);

// const seedUsers = [
//   {
//     username: "MattB",
//     password: "password",
//     email: "mattb@matt.com",
//   },
//   {
//     username: "Justyna",
//     password: "password2",
//     email: "jsutyna@justyna.com",
//   },
// ];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
};

module.exports = { seedDB };
