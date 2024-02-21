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
    travel: [
      {
        startdate: "date",
        leavetime: "time",
        arrivedate: "date",
        arrivetime: "time",
        type: "plane",
        info: "Heathrow",
      },
    ],
    stay: [
      {
        startdate: "date",
        endate: "date",
        name: "hotel coder",
        type: "hotel",
        info: "address",
      },
    ],
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
    activities: [{ startdate: "date", name: "museum", info: "town square" }],
  },
  {
    name: "Malta",
    admin: "Stavros",
    members: [
      {
        username: "Stavros",
        password: "password5",
        email: "stavros@stavros.com",
      },
    ],
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
    activities: [{ startdate: "date", name: "golfing", info: "golf-course" }],
    travel: [
      {
        startdate: "date",
        leavetime: "time",
        arrivedate: "date",
        arrivetime: "time",
        type: "plane",
        info: "Heathrow",
      },
    ],
    stay: [
      {
        startdate: "date",
        endate: "date",
        name: "hotel coder",
        type: "hotel",
        info: "address",
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