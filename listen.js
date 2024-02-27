const connectDB = require("./db/connect");
const { app, server } = require("./app");

connectDB();
const PORT = process.env.PORT || 9090;
const io = require('./socket').createSocketIOServer(server);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
    console.log(`WebSocket URL: ws://localhost:${PORT}`);
});
