const connectDB = require("./db/connect");
const app = require("./app");

connectDB();
const PORT = process.env.PORT || 9090;

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
