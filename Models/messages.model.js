const { Chat } = require("../db/data/dataSchemas");

exports.fetchMessages = async () => {
  const data = await Chat.find();
  console.log(data);
  return data;
};
