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

exports.editActivity = async (trip_id, activityId, activityToUpdate) => {
  const trip = await Trip.findById(activityId);
  // const tripActivites = trip.[...activities]
  console.log(trip, "ACTIVITIES MODEL NOT UPDATED");
  const activityToEdit = trip.activities.id(activityToUpdate._id);
  Object.assign(activityToEdit, activityToUpdate);
  console.log(activityToEdit);
  const data = await trip.save();
  console.log(data);
  //
  //
  //
  //
  //

  // const data = await Trip.updateOne(
  //   { _id: trip_id, "activities._id": activityId },
  //   {
  //     $set: {
  //       "activities.$.name": activityToUpdate.name,

  //       "activities.$.startdate": activityToUpdate.startdate,
  //     },
  //   }
  // );
  // const updatedTrip = await Trip.findById(trip_id);
  // console.log(updatedTrip.activities, "ACTIVITIES MODEL UPDATED");

  return data;
};
