const { User } = require("../db/data/dataSchemas");

exports.fetchUsers = async () => {
  const data = await User.find();
  return data;
};
