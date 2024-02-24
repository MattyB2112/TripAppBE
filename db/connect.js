const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const URI =
  "mongodb+srv://mattbarker23:TRIPAPPBACKEND@cluster0.jj43bd7.mongodb.net/test";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log(`MONGODB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
