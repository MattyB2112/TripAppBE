const { Trip } = require("../db/data/dataSchemas");

exports.addTravel = async (trip_id, travelData) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { travel: travelData } }
  );
  return data;
};

exports.removeTravel = async (trip_id, travel_id) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $pull: { travel: { _id: travel_id } } }
  );
  return data;
};

exports.editTravel = async (trip_id, travel_id, travelToUpdate) => {
  const trip = await Trip.findById(trip_id);

  const travelToEdit = trip.travel.id(travel_id);

  Object.assign(travelToEdit, travelToUpdate);

  const data = await trip.save();

  return data;
};
