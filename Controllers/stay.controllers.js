const { updateTripStay } = require("../Models/stay.model");

exports.patchTripStay = async (req, res, next) => {
  const stayData = req.body;
  const { trip_id } = req.params;

  try {
    const data = await updateTripStay(trip_id, stayData);
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Trip stay not updated!");
    }
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "couldn't patch" });
    } else {
      next(error);
    }
  }
};
