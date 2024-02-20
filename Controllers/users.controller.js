const { fetchUsers } = require("../Models/users.model");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.status(200).send({ users: users });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "users not found" });
    } else {
      next(error);
    }
  }
};
