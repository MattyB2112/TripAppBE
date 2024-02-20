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
    users.map((user) => {
      //console.log(user);
    });
    expect(response.status).toBe(200);
  });
  test("GET /trip returns trip data", async () => {
    const response = await request(app).get("/trip");
    const { trips } = response.body;
    trips.map((trip) => {
      //console.log(trip);
    });
    expect(response.status).toBe(200);
  });
  test("GET /trip/:trip_id returns a specific trip", async () => {
    const response = await request(app).get("/trip");
    const { trips } = response.body

    const tripId = trips[0]._id
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
      activities: [
        "museum", "restaurant", "club"
      ],
      __v: 0
    }

    const data = await request(app).get(`/trip/${tripId}`)
    const tripById = data._body.trip;
    expect(response.status).toBe(200)
    expect(tripById._id).toEqual(expectedTrip._id)
    expect(tripById.name).toEqual(expectedTrip.name)
    expect(tripById.admin).toEqual(expectedTrip.admin)
    expect(tripById.travel).toEqual(expectedTrip.travel)
    expect(tripById.stay).toEqual(expectedTrip.stay)
    expect(tripById.members).toEqual(expectedTrip.members)
    expect(tripById.activities).toEqual(expectedTrip.activities)
    expect(tripById.__v).toEqual(expectedTrip.__v)
  })
  test("GET: 404 - A valid but non-existent trip id returns an error message", async () => {
    const response = await request(app).get(`/trip/3DE0823C2F96376780BC0D77`);
    expect(response.status).toBe(404)
    expect(response._body.msg).toBe("Trip not found")
  })
});

describe("POST", () => {
  test("POST: /trip", async () => {
    const signedInUser = "Lala"
    const signedInUserObj = {
      username: "Lala",
      password: "password3",
      email: "lala@lala.com",
    }

    const newTrip = {
      name: "Big fun day",
      admin: signedInUser,
      members: [signedInUserObj]
    }



    const response = await request(app).post("/trip").send(newTrip)
    expect(response._body.newTripData).toHaveProperty("name")
    expect(response._body.newTripData).toHaveProperty("startdate")
    expect(response._body.newTripData).toHaveProperty("enddate")
    expect(response._body.newTripData).toHaveProperty("admin")
    expect(response._body.newTripData).toHaveProperty("travel")
    expect(response._body.newTripData).toHaveProperty("stay")
    expect(response._body.newTripData).toHaveProperty("members")
    expect(response._body.newTripData).toHaveProperty("activities")
    expect(response._body.newTripData).toHaveProperty("_id")
    expect(response.status).toBe(201)
  })
})
