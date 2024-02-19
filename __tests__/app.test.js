const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const User = require("../db/data/testData");
const URITest = "mongodb://localhost:27017/TripAppTEST";
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
];

const seedDB = async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
};

beforeAll(async () => {
  await mongoose.connect(URITest);
});

afterAll(() => {
  return mongoose.connection.close();
});

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(seedUsers);
});

describe("/user", () => {
  test("returns user data", async () => {
    const response = await request(app).get("/user");
    const { users } = response.body;
    users.map((user) => {
      console.log(user);
    });
    expect(response.status).toBe(200);
  });
});
