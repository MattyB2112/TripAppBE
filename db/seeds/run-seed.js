const mongoose = require("mongoose");
const devdata = require("../data/test-data/testData");
const { seedDBProd } = require("./seed");
const db = require("../connect.js");

const runSeed = () => {
  return seedDBProd(devdata).then(() => {
    mongoose.connection.close();
  });
};
runSeed();
