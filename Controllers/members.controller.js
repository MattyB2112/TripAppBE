const { addMember, removeMember } = require("../Models/members.model");

exports.setMember = async (req, res, next) => {
  const { trip_id } = req.params;
  const { userId } = req.body;
  try {
    const data = await addMember(trip_id, userId);
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Member not added!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteMember = async (req, res, next) => {
  const memberToDelete = req.body;
  const { trip_id } = req.params;
  try {
    const data = await removeMember(trip_id, memberToDelete);
    if (data.acknowledged === true && data.modifiedCount > 0) {
      res.status(204).send({ data: data });
    } else {
      res.status(404).send("Member not deleted!");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
