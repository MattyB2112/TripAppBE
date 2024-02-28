const mongoose = require("mongoose");
const socketIO = require("socket.io");
const { Chat, Trip } = require("./db/data/dataSchemas");
const connectDB = require("./db/connect");
connectDB();

const createSocketIOServer = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:19006",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinTrip", async (tripId) => {
      //join the room corresponding to the trip
      socket.join(tripId);
      console.log(`User ${socket.id} joined trip ${tripId}`);

      //get members of the trip to emit messages only to them
      try {
        const trip = await Trip.findById(tripId);
        const tripMembers = trip.members || [];

        //other members recieve that a new user has joined
        socket.to(tripId).emit("userJoined", { userId: socket.id });

        //emit the current list of trip members to the connected user
        socket.emit("tripMembers", tripMembers);
      } catch (error) {
        console.error("Error joining trip:", error.message);
      }
    });

    socket.on("chatMessage", async (data) => {
      try {
        const { tripId, messageSender, messageContent } = data;

        const newMessage = new Chat({
          tripId,
          messageSender,
          messageContent,
        });

        const savedMessage = await newMessage.save();

        //emit the message to all members of the trip
        io.to(tripId).emit("chatMessage", savedMessage);
      } catch (error) {
        console.error("Error sending chat message:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

module.exports = { createSocketIOServer };
