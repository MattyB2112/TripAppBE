const {
  fetchTrips,
  fetchTripById,
  addTrip,
  removeTrip,
  editTrip,
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

//{newtrip: TRIPINFO, loggedin: USERDATA}

exports.postTrip = async (req, res, next) => {
  const { newTrip, signedInUser } = req.body;
  console.log(newTrip, signedInUser, "CONTROLLER");
  try {
    const newTripData = await addTrip(newTrip, signedInUser);
    console.log(newTripData, "CONTROLLER NEWTRIP DATA");
    res.status(201).send({ newTripData: newTripData });
  } catch (error) {
    console.log(error);
    next(error);
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

exports.patchTrip = async (req, res, next) => {
  try {
    const { trip_id } = req.params;
    const tripToUpdate = req.body;

    const data = await editTrip(trip_id, tripToUpdate);

    res.status(204).send({ data: data });
  } catch (error) {
    next(error);
  }
};
