const { Trip, User } = require("../db/data/dataSchemas");

exports.addMember = async (trip_id, userId) => {
  const userData = await User.findById(userId);
  const count = await Trip.findOne({
    _id: trip_id,
    "members._id": userData._id,
  });

  if (count === null) {
    const data = await Trip.updateOne(
      { _id: trip_id },
      { $push: { members: userData } }
    );
    return data;
  } else {
    return { data: { acknowledged: false } };
  }
};

exports.removeMember = async (trip_id, memberToDelete) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $pull: { members: memberToDelete } }
  );
  return data;
};
