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
    email: "justyna@justyna.com",
  },
  {
    username: "Lala",
    password: "password3",
    email: "lala@lala.com",
  },
  {
    username: "Jack",
    password: "password4",
    email: "jack@jack.com",
  },
  {
    username: "Stavros",
    password: "password5",
    email: "stavros@stavros.com",
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
        email: "justyna@justyna.com",
      },
    ],
    activities: [
      "museum", "restaurant", "club"
    ]
  },
  {
    name: "Malta",
    admin: "Stavros",
    members: [{
      username: "Stavros",
      password: "password5",
      email: "stavros@stavros.com",
    },]
  },
  {
    name: "Group trip",
    admin: "Jack",
    members: [
      {
        username: "MattB",
        password: "password",
        email: "mattb@matt.com",
      },
      {
        username: "Justyna",
        password: "password2",
        email: "justyna@justyna.com",
      },
      {
        username: "Lala",
        password: "password3",
        email: "lala@lala.com",
      },
      {
        username: "Jack",
        password: "password4",
        email: "jack@jack.com",
      },
      {
        username: "Stavros",
        password: "password5",
        email: "stavros@stavros.com",
      },
    ],
    activities: ["theatre", "golfing"],
    travel: ["plane at 1pm", "taxi at 6pm"],
    stay: ["Random Inn"],
  }
];

const seedDB = async () => {
  await User.deleteMany({});
  await Trip.deleteMany({});
  await User.insertMany(seedUsers);
  await Trip.insertMany(seedTrips);
};

module.exports = { seedDB, seedUsers, seedTrips };
