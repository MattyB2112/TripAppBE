const { addStay, removeStay } = require("../Models/stay.model");

exports.setStay = async (req, res, next) => {
  const stayData = req.body;
  const { trip_id } = req.params;

  try {
    const data = await addStay(trip_id, stayData);
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

exports.deleteStay = async (req, res, next) => {
  const { trip_id, stay_id } = req.params;
  try {
    const data = await removeStay(trip_id, stay_id);
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Stay not deleted!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
