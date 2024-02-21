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

describe("/GET", () => {
  test("GET/user returns user data", async () => {
    const response = await request(app).get("/user");
    const { users } = response.body;

    expect(response.status).toBe(200);
  });

  test("GET /trip returns trip data", async () => {
    const response = await request(app).get("/trip");
    const { trips } = response.body;

    expect(response.status).toBe(200);
  });

  test("GET /trip/:trip_id returns a specific trip", async () => {
    const response = await request(app).get("/trip");
    const { trips } = response.body;

    const tripId = trips[0]._id;
    const expectedTrip = {
      _id: tripId,
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
      activities: ["museum", "restaurant", "club"],
      __v: 0,
    };

    const data = await request(app).get(`/trip/${tripId}`);
    const tripById = data._body.trip;
    expect(response.status).toBe(200);
    expect(tripById._id).toEqual(expectedTrip._id);
    expect(tripById.name).toEqual(expectedTrip.name);
    expect(tripById.admin).toEqual(expectedTrip.admin);
    expect(tripById.travel).toEqual(expectedTrip.travel);
    expect(tripById.stay).toEqual(expectedTrip.stay);
    expect(tripById.members).toEqual(expectedTrip.members);
    expect(tripById.activities).toEqual(expectedTrip.activities);
    expect(tripById.__v).toEqual(expectedTrip.__v);
  });
  test("GET: 404 - A valid but non-existent trip id returns an error message", async () => {
    const response = await request(app).get(`/trip/3DE0823C2F96376780BC0D77`);
    expect(response.status).toBe(404);
    expect(response._body.msg).toBe("Trip not found");
  });
});

describe("POST", () => {
  test("POST: /trip", async () => {
    const signedInUser = "Lala";
    const signedInUserObj = {
      username: "Lala",
      password: "password3",
      email: "lala@lala.com",
    };

    const newTrip = {
      name: "Big fun day",
      admin: signedInUser,
      members: [signedInUserObj],
    };

    const response = await request(app).post("/trip").send(newTrip);
    expect(response._body.newTripData).toHaveProperty("name");
    expect(response._body.newTripData).toHaveProperty("startdate");
    expect(response._body.newTripData).toHaveProperty("enddate");
    expect(response._body.newTripData).toHaveProperty("admin");
    expect(response._body.newTripData).toHaveProperty("travel");
    expect(response._body.newTripData).toHaveProperty("stay");
    expect(response._body.newTripData).toHaveProperty("members");
    expect(response._body.newTripData).toHaveProperty("activities");
    expect(response._body.newTripData).toHaveProperty("_id");
    expect(response.status).toBe(201);
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

describe("/PATCH /trips/tripbyId/activity", () => {
  test("should update trips activity pro document", async () => {
    const responseId = await request(app).get("/trip");
    const { trips } = responseId.body;

    const tripId = trips[0]._id;

    const activity = "fishing";
    const response = await request(app)
      .patch(`/trip/${tripId}/activity`)
      .send(activity);
    console.log(response);
    expect(response.status).toBe(200);
  });
});
