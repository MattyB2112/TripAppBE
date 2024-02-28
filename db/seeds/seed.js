const { User, Trip, Chat } = require("../data/dataSchemas");
const {
  seedTrips,
  seedUsers,
  seedMessages,
} = require("../data/test-data/testData");

const seedDB = async () => {
  await User.deleteMany({});
  await Trip.deleteMany({});
  await Chat.deleteMany({});
  await User.insertMany(seedUsers);
  await Trip.insertMany(seedTrips);
  await Chat.insertMany(seedMessages);
};

const seedDBProd = async () => {
  await User.insertMany(seedUsers);
  await Trip.insertMany(seedTrips);
};

module.exports = { seedDB, seedDBProd };
