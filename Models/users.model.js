const { User } = require("../db/data/dataSchemas");

exports.fetchUsers = async () => {
  const data = await User.find();
  return data;
};

exports.fetchUserByUsername = async (username) => {
  const data = await User.findOne({ username: username });
  return data;
};

exports.createUser = async (username, password, email) => {
  const newUser = new User({
    username: username,
    password: password,
    email: email,
  });
  const data = await newUser.save();
  return data;
};
