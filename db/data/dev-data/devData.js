const devUsers = [
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
const devTrips = [
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
    members: [],
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
    members: [],
    activities: [{ name: "dancing", startdate: "date", info: "town square" }],
  },
];

module.exports = { devUsers, devTrips };
