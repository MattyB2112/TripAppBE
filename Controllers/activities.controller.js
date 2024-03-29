const {
  addActivity,
  removeActivity,
  editActivity,
} = require("../Models/activities.model");

exports.setActivity = async (req, res, next) => {
  const { trip_id } = req.params;
  const activity = req.body;
  try {
    const data = await addActivity(trip_id, activity);
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Activity not added!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteActivity = async (req, res, next) => {
  const { trip_id, activity_id } = req.params;
  try {
    const data = await removeActivity(trip_id, activity_id);
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Activity not deleted!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.patchActivity = async (req, res, next) => {
  try {
    const { trip_id, activity_id } = req.params;
    const activityToUpdate = req.body;

    const data = await editActivity(trip_id, activity_id, activityToUpdate);

    res.status(204).send({ data: data });
  } catch (error) {
    next(error);
  }
};
