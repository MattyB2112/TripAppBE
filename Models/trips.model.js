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

exports.addActivity = async (trip_id, activity) => {
  console.log(trip_id, activity, "passed in to model");
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { activities: activity } }
  );
  return data;
};

exports.addMember = async (trip_id, member) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { members: member } }
  );
  return data;
};
