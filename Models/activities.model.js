const { Trip } = require("../db/data/dataSchemas");

exports.addActivity = async (trip_id, activity) => {
  console.log(trip_id, activity, "passed in to model");
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { activities: activity } }
  );
  return data;
};
