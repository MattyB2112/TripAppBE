const { Trip } = require("../db/data/dataSchemas");

exports.addTravel = async (trip_id, travelData) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { travel: travelData } }
  );
  return data;
};

exports.removeTravel = async (trip_id, travelToDelete) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $pull: { travel: travelToDelete } }
  );
  return data;
};

exports.editTravel = async (trip_id, travel_id, travelToUpdate) => {
  const trip = await Trip.findById(trip_id);

  console.log(travel_id, "travel ID in MODEL");

  const travelToEdit = trip.travel.id(travel_id);

  console.log(travelToEdit, "travel to edit");

  Object.assign(travelToEdit, travelToUpdate);

  const data = await trip.save();
  console.log(data, "data in model");

  return data;
};
