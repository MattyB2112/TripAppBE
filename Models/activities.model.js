const { Trip } = require("../db/data/dataSchemas");

exports.addActivity = async (trip_id, activity) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { activities: activity } }
  );
  return data;
};

exports.removeActivity = async (trip_id, activity_id) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $pull: { activities: { _id: activity_id } } }
  );
  return data;
};

exports.editActivity = async (trip_id, activity_id, activityToUpdate) => {
  const trip = await Trip.findById(trip_id);

  const activityToEdit = trip.activities.id(activity_id);

  Object.assign(activityToEdit, activityToUpdate);

  const data = await trip.save();

  return data;
};
