const { fetchMessages } = require("../Models/messages.model");

exports.getMessages = async (req, res, next) => {
  const { trip_id } = req.params;
  console.log(trip_id);
  try {
    const messages = await fetchMessages(trip_id);
    res.status(200).send({ messages: messages });
  } catch (error) {
    if (error.status === 404) {
      res.status(404).json({ msg: "messages not found" });
    } else {
      next(error);
    }
  }
};
