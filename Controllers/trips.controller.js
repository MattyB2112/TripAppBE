const {
  fetchTrip,
  fetchTripById,
  addTrip,
  addActivity,
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

exports.patchActivity = async (req, res, next) => {
  const { trip_id } = req.params
  const { activity } = req.body;
  console.log(activity, "should be fishing")
  try {
    console.log("controller");
    const newActivityData = await addActivity(trip_id, activity)
    //send back all activities on that trip
    res.status(200).send({ newActivityData: newActivityData })
  } catch (error) {
    console.log(error)
    next(error)
  }
};


//
//activities: {
//   [
//   {
//   startdate: "date"
//   name: "golfing"
//   info : "golf-course"
//    }
//   ]
// }