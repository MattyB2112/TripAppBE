const { addTravel, removeTravel } = require("../Models/travel.model");

exports.setTravel = async (req, res, next) => {
  const travelData = req.body;
  const { trip_id } = req.params;

  try {
    const data = await addTravel(trip_id, travelData);
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Trip travel not updated!");
    }
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "couldn't patch" });
    } else {
      next(error);
    }
  }
};

exports.deleteTravel = async (req, res, next) => {
  const { trip_id, travel_id } = req.params;
  try {
    const data = await removeTravel(trip_id, travel_id);
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Travel not deleted!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
