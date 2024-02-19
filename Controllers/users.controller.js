const { User, Trip } = require("../db/data/dataSchemas");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).send({ users: users });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "users not found" });
    } else {
      next(error);
    }
  }
};

exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.status(200).send({ trips: trips });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "trips not found" });
    } else {
      next(error);
    }
  }
};
