const { Trip } = require("../db/data/dataSchemas");

exports.fetchTrip = async () => {
  const data = await Trip.find();
  return data;
};
