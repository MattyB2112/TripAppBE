const {
  fetchTrip,
  fetchTripById,
  addTrip,
  addActivity,
  addMember
} = require("../Models/trips.model");

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

exports.getTripById = async (req, res, next) => {
  const { trip_id } = req.params;
  try {
    const trip = await fetchTripById(trip_id);
    res.status(200).send({ trip: trip });
  } catch (error) {
    if (error.status === 404) {
      console.log(error);
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

exports.setActivity = async (req, res, next) => {
  const { trip_id } = req.params
  const activity = req.body;
  try {

    const data = await addActivity(trip_id, activity)
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data })
    }
    else {
      res.status(404).send("Activity not added!")
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
};

exports.setMembers = async (req, res, next) => {
  const { trip_id } = req.params
  const member = req.body;
  try {
    const data = await addMember(trip_id, member)
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data })
    } else {
      res.status(404).send("Member not added!")
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
}