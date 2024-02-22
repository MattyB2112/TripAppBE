const {
  fetchTrips,
  fetchTripById,
  addTrip,
  removeTrip,
} = require("../Models/trips.model");

exports.getTrips = async (req, res, next) => {
  try {
    const trips = await fetchTrips();
    res.status(200).send({ trips: trips });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "trips not found" });
    } else {
      next(error);
    }
  }
};

exports.getTripById = async (req, res, next) => {
  const { trip_id } = req.params;
  try {
    const trip = await fetchTripById(trip_id);
    res.status(200).send({ trip: trip });
  } catch (error) {
    if (error.status === 404) {
      const errorMessage = error.message;
      res.status(404).send({ msg: errorMessage });
    } else {
      next(error);
    }
  }
};

exports.postTrip = async (req, res, next) => {
  const newTrip = req.body;
  try {
    const newTripData = await addTrip(newTrip);
    res.status(201).send({ newTripData: newTripData });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  const { trip_id } = req.params;
  try {
    const data = await removeTrip(trip_id);
    if (data.acknowledged === true && data.deletedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Trip not deleted!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
