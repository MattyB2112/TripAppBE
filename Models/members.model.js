const { Trip } = require("../db/data/dataSchemas");

exports.addMember = async (trip_id, member) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $push: { members: member } }
  );
  return data;
};

exports.removeMember = async (trip_id, memberToDelete) => {
  const data = await Trip.updateOne(
    { _id: trip_id },
    { $pull: { members: memberToDelete } }
  );
  return data;
};
