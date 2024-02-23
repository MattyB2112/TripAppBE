const ENV = process.env.NODE_ENV || "development";
const mongoose = require("mongoose");
const { seedDB, seedDBProd } = require("../db/seeds/seed");

const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

const URIProd =
  "mongodb+srv://mattbarker23:TRIPAPPBACKEND@cluster0.jj43bd7.mongodb.net/";

const prodSetUp = async () => {
  await mongoose.connect(URIProd);
  // await seedDBProd();

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Mongoose connection error:", err);
  });
};

prodSetUp();
