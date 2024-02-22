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
    const response = await request(app).get("/users");
    const { users } = response.body;

    expect(response.status).toBe(200);
  });

  test("GET /trip returns trip data", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    expect(response.status).toBe(200);
  });

  test("GET /trip/:trip_id returns a specific trip", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[0]._id;

    const expectedTrip = {
      _id: tripId,
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
      __v: 0,
    };

    const data = await request(app).get(`/trips/${tripId}`);
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
    const response = await request(app).get(`/trips/3DE0823C2F96376780BC0D77`);
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

    const response = await request(app).post("/trips").send(newTrip);
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
    const response = await request(app).post("/users").send(userToAdd);
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
    const response = await request(app).post("/users").send(userToAdd);
    expect(response.status).toBe(400);
  });
});

describe("/POST /trips/:tripbyId/activity", () => {
  test("should update trips activity pro document", async () => {
    const responseId = await request(app).get("/trips");
    const { trips } = responseId.body;

    const tripId = trips[0]._id;

    const activity = {
      startdate: "tomorrow",
      name: "fishing",
      info: "Trafalgar Square",
    };

    const response = await request(app)
      .post(`/trips/${tripId}/activities`)
      .send(activity);
    expect(response.status).toBe(204);

    const data = await request(app).get(`/trips/${tripId}`);
    const tripById = data._body.trip;
    expect(tripById.activities).toHaveLength(2);
  });
});

describe("POST /trips/:tripbyid/members", () => {
  test("adds member to members array of a given trip", async () => {
    const responseId = await request(app).get("/trips");
    const { trips } = responseId.body;

    const tripId = trips[1]._id;
    const member = {
      username: "Justyna",
      password: "password2",
      email: "justyna@justyna.com",
    };

    const response = await request(app)
      .post(`/trips/${tripId}/members`)
      .send({ member });
    expect(response.status).toBe(204);

    const data = await request(app).get(`/trips/${tripId}`);
    const tripById = data._body.trip;
    expect(tripById.members).toHaveLength(2);
  });
});

describe("POST", () => {
  test("patching travel on a trip returns new travel object", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[0]._id;
    const travelToAdd = {
      startdate: "24th June",
      leavetime: "6:45pm",
      arrivedate: "24th June",
      arrivetime: "10:30pm",
      type: "plane",
      info: "Heathrow",
    };

    const result = await request(app)
      .post(`/trips/${tripId}/travel`)
      .send(travelToAdd);

    const updatedResponse = await request(app).get("/trips");
    const updatedTrip = updatedResponse.body.trips[0];

    expect(result.status).toBe(204);
    expect(updatedTrip.travel[1]).toEqual(travelToAdd);
  });

  test("patching stay on a trip updates stay on that trip", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[0]._id;
    const stayToAdd = {
      startdate: "10th May",
      endate: "15th May",
      name: "hotel helloworld",
      type: "hotel",
      info: "123 hello street",
    };

    const result = await request(app)
      .post(`/trips/${tripId}/stay`)
      .send(stayToAdd);

    const updatedResponse = await request(app).get("/trips");
    const updatedTrip = updatedResponse.body.trips[0];

    expect(result.status).toBe(204);
    expect(updatedTrip.stay[1]).toEqual(stayToAdd);
  });
});

describe("PATCH", () => {
  describe("PATCH /trips/:trip_id/activities", () => {
    test.only("update trips activity", async () => {
      const responseId = await request(app).get("/trips");
      const { trips } = responseId.body;
      const activityId = trips[1].activities[0]._id;
      const activityToUpdate = {
        activityId: activityId,
        activityToUpdate: { name: "swimming", startdate: "21st Dec" },
      };
      console.log(activityId, "ACTIVITY ID TEST LOG");
      console.log(trips[1].activities, "ACTIVITES TEST LOG");
      const tripId = trips[1]._id;

      const response = await request(app)
        .patch(`/trips/${tripId}/activities`)
        .send(activityToUpdate);

      expect(response.status).toBe(200);

      const updatedResponse = await request(app).get("/trips");
      console.log(
        updatedResponse[1].activities,
        "<-- UPDATED SHOULD SAY SWIMMING"
      );
    });
  });
});

describe("DELETE", () => {
  test("deleting an activity removes it from the database", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[2]._id;
    console.log(trips[2].activities, "<-- NOT UPDATED ACTIVITY");
    const activityToDelete = {
      startdate: "dateone",
      name: "banana",
      info: "banana museum",
    };

    const result = await request(app)
      .delete(`/trips/${tripId}/activities`)
      .send(activityToDelete);

    const updatedResponse = await request(app).get("/trips");
    const updatedTrip = updatedResponse.body.trips[2];
    console.log(updatedTrip.activities, "<-- UPDATED ACTIVITY");

    expect(result.status).toBe(204);
    expect(updatedTrip.activities).toHaveLength(1);
  });
  test("deleting a non-existent activity returns an error and relevant message", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[2]._id;
    const activityToDelete = {
      startdate: "dateone",
      name: "THIS WONT WORK",
      info: "THIS WONT WORK",
    };

    const result = await request(app)
      .delete(`/trips/${tripId}/activities`)
      .send(activityToDelete);

    expect(result.status).toBe(404);
    expect(result.text).toBe("Activity not deleted!");
  });
  test("deleting a stay removes it from the trip", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[2]._id;
    console.log(trips[2].stay, "<-- NOT UPDATED STAY");
    const stayToDelete = {
      startdate: "date",
      enddate: "date",
      name: "DELETE TEST",
      type: "DELETE TEST",
      info: "DELETE TEST",
    };

    const result = await request(app)
      .delete(`/trips/${tripId}/stay`)
      .send(stayToDelete);

    const updatedResponse = await request(app).get("/trips");
    const updatedTrip = updatedResponse.body.trips[2];

    console.log(updatedTrip.stay, "<-- UPDATED STAY");

    expect(result.status).toBe(204);
    expect(updatedTrip.stay).toHaveLength(1);
  });
  test("deleting a non-existent stay returns an error and relevant message", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[2]._id;
    const stayToDelete = {
      startdate: "date",
      enddate: "date",
      name: "BANANA",
      type: "BANANA",
      info: "BANANA",
    };

    const result = await request(app)
      .delete(`/trips/${tripId}/stay`)
      .send(stayToDelete);

    expect(result.status).toBe(404);
    expect(result.text).toBe("Stay not deleted!");
  });
  test("deleting a travel removes it from the trip", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[2]._id;
    console.log(trips[2].travel, "<-- NOT UPDATED TRAVEL");

    const travelToDelete = {
      startdate: "date",
      leavetime: "time",
      arrivedate: "date",
      arrivetime: "time",
      type: "TRAIN",
      info: "KINGS CROSS",
    };

    const result = await request(app)
      .delete(`/trips/${tripId}/travel`)
      .send(travelToDelete);

    const updatedResponse = await request(app).get("/trips");
    const updatedTrip = updatedResponse.body.trips[2];
    console.log(updatedTrip.travel, "<-- UPDATED TRAVEL");

    expect(result.status).toBe(204);
    expect(updatedTrip.travel).toHaveLength(1);
  });
  test("deleting a non-existent travel returns an error and relevant message", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[2]._id;
    const travelToDelete = {
      startdate: "date",
      enddate: "date",
      name: "BANANA",
      type: "BANANA",
      info: "BANANA",
    };

    const result = await request(app)
      .delete(`/trips/${tripId}/travel`)
      .send(travelToDelete);

    expect(result.status).toBe(404);
    expect(result.text).toBe("Travel not deleted!");
  });
  test("deleting a member removes them from the trip", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[2]._id;
    console.log(trips[2].members, "<-- NOT UPDATED MEMBERS");

    const memberToDelete = {
      username: "Justyna",
      password: "password2",
      email: "justyna@justyna.com",
    };

    const result = await request(app)
      .delete(`/trips/${tripId}/members`)
      .send(memberToDelete);

    const updatedResponse = await request(app).get("/trips");
    const updatedTrip = updatedResponse.body.trips[2];
    console.log(updatedTrip.members, "<-- UPDATED MEMBERS");

    expect(result.status).toBe(204);
    expect(updatedTrip.members).toHaveLength(4);
  });
  test("deleting a non-existent member returns an error and relevant message", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;
    const tripId = trips[2]._id;

    const memberToDelete = {
      username: "Johnny Banana",
      password: "password2",
      email: "justyna@justyna.com",
    };

    const result = await request(app)
      .delete(`/trips/${tripId}/members`)
      .send(memberToDelete);

    expect(result.status).toBe(404);
    expect(result.text).toBe("Member not deleted!");
  });
  test("deleting an entire trip removes it from the database", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripId = trips[2]._id;
    console.log(trips.length, "<-- NOT UPDATED TRIPS - SHOULD BE 3");

    const result = await request(app).delete(`/trips/${tripId}/`);

    const updatedResponse = await request(app).get("/trips");
    const updatedTrips = updatedResponse.body.trips;
    console.log(updatedTrips.length, "<-- UPDATED TRIPS - SHOULD BE 2");

    expect(result.status).toBe(204);
    expect(updatedTrips).toHaveLength(2);
  });
  test("deleting a non-existent trip returns an error and relevant message", async () => {
    const response = await request(app).get("/trips");
    const { trips } = response.body;

    const tripToDelete = "F5DE30FD22067390B2D5C2D0";

    const result = await request(app).delete(`/trips/${tripToDelete}/`);

    expect(result.status).toBe(404);
    expect(result.text).toBe("Trip not deleted!");
  });
});
