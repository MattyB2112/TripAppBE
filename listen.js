// const connectDB = require("./db/connect");
const { app, server, io } = require("./app");
// const { createSocketIOServer } = require("./socket");
// connectDB();
// createSocketIOServer(server);
const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
  console.log(`WebSocket URL: ws://localhost:${PORT}`);
});
