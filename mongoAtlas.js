const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://mattbarker23:TRIPAPPBACKEND@cluster0.jj43bd7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

MongoClient.connect(uri, { minPoolSize: 2, maxPoolSize: 10 }).then(
  async (client) => {
    try {
      await client.db("admin").command({ ping: 1 });
      console.log("Connected to MongoDB!");
    } finally {
      await client.close();
    }
  }
);
