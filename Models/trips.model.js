const { Trip, User } = require("../db/data/dataSchemas");

exports.fetchTrip = async () => {
  const data = await Trip.find();
  return data;
};

exports.fetchTripById = async (trip_id) => {
  const data = await Trip.findById(trip_id).exec();
  if (data === null) {
    const error = new Error();
    error.status = 404;
    error.message = "Trip not found";
    throw error;
  } else {
    return data;
  }
};

exports.addTrip = async (tripData) => {
  const newTrip = new Trip(tripData);
  const response = await newTrip.save();
  return response;
};
