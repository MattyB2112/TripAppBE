const { User, Trip } = require("../data/dataSchemas");
const { seedTrips, seedUsers } = require("../data/test-data/testData");

const seedDB = async () => {
  await User.deleteMany({});
  await Trip.deleteMany({});
  await User.insertMany(seedUsers);
  await Trip.insertMany(seedTrips);
};

const seedDBProd = async () => {
  await User.insertMany(seedUsers);
  await Trip.insertMany(seedTrips);
};

module.exports = { seedDB, seedDBProd };
