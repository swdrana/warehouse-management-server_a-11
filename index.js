const express = require("express");
const cors = require("cors");
require("dotenv").config();

// For Middleware
const app = express();
app.use(cors());
app.use(express.json());

/********************************************\
            MongoDB Connection Start
\********************************************/
// Import
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@techhub-cluster.kff4u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// client.connect(err => {
//   const collection = client.db("techHubDB").collection("products");
//   console.log("DB Connected");
//   // perform actions on the collection object
//   client.close();
// });

const run = async () => {
  try {
    await client.connect();
    const productsCollection = client.db("techHubDB").collection("products");
    app.post("/add", async (req, res) => {
      const newItem = req.body;
      console.log(newItem);
      res.send({ result: "data received!" });
      const result = await productsCollection.insertOne(newItem);
      console.log("User Inserted. ID: ", result.insertedId);
    });
  } finally {
    // await client.close();
  }
};
run().catch(console.dir);

/********************************************\
            MongoDB Connection End
\********************************************/

// Create root API
app.get("/", (req, res) => {
  res.send("Running server");
});

// For Port & Listening
const port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
  console.log("Listening to port", port);
});
