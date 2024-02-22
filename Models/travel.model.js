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
