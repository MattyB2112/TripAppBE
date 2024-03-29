const { Trip } = require("../db/data/dataSchemas");

exports.fetchTrips = async () => {
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
  const firstMember = tripData.admin;
  const newTrip = new Trip(tripData);
  newTrip.members.push({ username: firstMember });
  const response = await newTrip.save();
  // console.log(response, "MODEL");
  return response;
};

exports.removeTrip = async (trip_id) => {
  const data = await Trip.deleteOne({ _id: trip_id });
  return data;
};

exports.editTrip = async (trip_id, tripToUpdate) => {
  const trip = await Trip.findById(trip_id);

  Object.assign(trip, tripToUpdate);

  const data = await trip.save();
  return data;
};
