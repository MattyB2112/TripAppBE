const { app, server } = require("./app");
const { PORT = 9090 } = process.env;
const io = require('./socket').createSocketIOServer(server);

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`);
    console.log(`WebSocket URL: ws://localhost:${PORT}`);
});
