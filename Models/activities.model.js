const { Trip } = require("../db/data/dataSchemas");

exports.addActivity = async (trip_id, activity) => {
  console.log(trip_id, activity, "passed in to model");
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { activities: activity } }
  );
  return data;
};

exports.removeActivity = async (trip_id, activityToDelete) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $pull: { activities: activityToDelete } }
  );
  return data;
};

exports.editActivity = async (trip_id, activity_id, activityToUpdate) => {
  const trip = await Trip.findById(trip_id);

  console.log(activity_id, "activity ID in MODEL");

  const activityToEdit = trip.activities.id(activity_id);

  console.log(activityToEdit, "activity to edit");

  Object.assign(activityToEdit, activityToUpdate);

  const data = await trip.save();
  console.log(data, 'data in model');

  return data;
};
