const { addActivity } = require("../Models/activities.model");

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
