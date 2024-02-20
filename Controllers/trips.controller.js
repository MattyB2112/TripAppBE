const { fetchTrip } = require("../Models/trips.model");

exports.getTrip = async (req, res, next) => {
  try {
    const trips = await fetchTrip();
    res.status(200).send({ trips: trips });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "trips not found" });
    } else {
      next(error);
    }
  }
};
