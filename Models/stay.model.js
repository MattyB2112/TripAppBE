const { Trip } = require("../db/data/dataSchemas");

exports.addStay = async (trip_id, stayData) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { stay: stayData } }
  );
  return data;
};

exports.removeStay = async (trip_id, stayToDelete) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $pull: { stay: stayToDelete } }
  );
  return data;
};

exports.editStay = async (trip_id, stay_id, stayToUpdate) => {
  const trip = await Trip.findById(trip_id);
  const stayToEdit = trip.stay.id(stay_id);

  Object.assign(stayToEdit, stayToUpdate);

  const data = await trip.save();
  return data;
};
