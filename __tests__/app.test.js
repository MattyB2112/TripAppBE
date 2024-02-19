const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const URITest = "mongodb://localhost:27017/TripAppTEST";
const { seedDB } = require("../db/seeds/seed");

beforeAll(async () => {
  await mongoose.connect(URITest);
});

afterAll(() => {
  return mongoose.connection.close();
});

beforeEach(async () => {
  await seedDB();
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
