const { Trip } = require("../db/data/dataSchemas");

exports.updateTripStay = async (trip_id, stayData) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { stay: stayData } }
  );
  return data;
};
