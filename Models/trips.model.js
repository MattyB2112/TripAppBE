const { Trip } = require("../db/data/dataSchemas");

exports.fetchTrips = async () => {
  const data = await Trip.find();
  return data;
};
