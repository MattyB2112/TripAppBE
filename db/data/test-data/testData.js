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
        enddate: "date",
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
        enddate: "date",
        name: "hotel coder",
        type: "hotel",
        info: "address",
      },
    ],
    members: [
      {
        _id: 1234566,
        username: "Stavros",
        password: "password5",
        email: "stavros@stavros.com",
      },
    ],
    activities: [{ name: "dancing", startdate: "date", info: "town square" }],
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
    activities: [
      { startdate: "date", name: "golfing", info: "golf-course" },
      { startdate: "dateone", name: "banana", info: "banana museum" },
    ],
    travel: [
      {
        startdate: "date",
        leavetime: "time",
        arrivedate: "date",
        arrivetime: "time",
        type: "plane",
        info: "Heathrow",
      },
      {
        startdate: "date",
        leavetime: "time",
        arrivedate: "date",
        arrivetime: "time",
        type: "TRAIN",
        info: "KINGS CROSS",
      },
    ],
    stay: [
      {
        startdate: "date",
        enddate: "date",
        name: "hotel coder",
        type: "hotel",
        info: "address",
      },
      {
        startdate: "date",
        enddate: "date",
        name: "DELETE TEST",
        type: "DELETE TEST",
        info: "DELETE TEST",
      },
    ],
  },
];

module.exports = { seedUsers, seedTrips };
