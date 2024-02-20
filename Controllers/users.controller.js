const {
  fetchUser,
  fetchUserByUsername,
  createUser,
} = require("../Models/users.model");

exports.getUser = async (req, res, next) => {
  try {
    const users = await fetchUser();
    res.status(200).send({ users: users });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "users not found" });
    } else {
      next(error);
    }
  }
};

exports.getUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await fetchUserByUsername(username);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

exports.postUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const newUser = await createUser(username, password, email);
    res.status(201).send({ newUser });
  } catch (error) {
    next(error);
  }
};
