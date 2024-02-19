const { User, Trip } = require("../data/dataSchemas");

const seedUsers = [
  {
    username: "MattB",
    password: "password",
    email: "mattb@matt.com",
  },
  {
    username: "Justyna",
    password: "password2",
    email: "jsutyna@justyna.com",
  },
];

const seedTrips = [
  {
    name: "Paris",
    admin: "Justyna",
    travel: ["plane at 5pm", "train at 8pm"],
    stay: ["Hilton for a week", "Ritz for a week"],
    members: [
      {
        username: "MattB",
        password: "password",
        email: "mattb@matt.com",
      },
      {
        username: "Justyna",
        password: "password2",
        email: "jsutyna@justyna.com",
      },
    ],
  },
];

const seedDB = async () => {
  await User.deleteMany({});
  await Trip.deleteMany({});
  await User.insertMany(seedUsers);
  await Trip.insertMany(seedTrips);
};

module.exports = { seedDB, seedUsers, seedTrips };
