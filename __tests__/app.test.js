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

describe("GET /user", () => {
  test("returns user data", async () => {
    const response = await request(app).get("/user");
    const { users } = response.body;
    users.map((user) => {});
    expect(response.status).toBe(200);
  });
});

describe("GET /trip", () => {
  test("returns trip data", async () => {
    const response = await request(app).get("/trip");
    const { trips } = response.body;
    trips.map((trip) => {});
    expect(response.status).toBe(200);
  });
});

describe("GET /users/:username", () => {
  test("returns user's username", async () => {
    const response = await request(app).get("/users/MattB");
    const { user } = response.body;
    expect(response.status).toBe(200);
    expect(user.username).toBe("MattB");
  });
  test("returns correct error message if user not found", async () => {
    const response = await request(app).get("/users/MattyBoo");
    const { user } = response.body;
    expect(response.status).toBe(404);
  });
});

describe("POST /user", () => {
  test("returns user object with correct properties", async () => {
    const userToAdd = {
      username: "Jenny",
      password: "password10",
      email: "jenny@fromtheblock.com",
    };
    const response = await request(app).post("/user").send(userToAdd);
    const { newUser } = response._body;
    expect(response.status).toBe(201);
    expect(newUser).toHaveProperty("username");
    expect(newUser).toHaveProperty("password");
    expect(newUser).toHaveProperty("email");
  });
  test("400- returns duplicate key error message when new users try to sign in as an existing user", async () => {
    const userToAdd = {
      username: "MattB",
      password: "password",
      email: "mattb@matt.com",
    };
    const response = await request(app).post("/user").send(userToAdd);
    expect(response.status).toBe(400);
  });
});

