// Author: Maxwell Rohrer Tate Myers
// ISU Netid : mrohrer@iastate.edu tatmyers@iastate.edu
// Date :  April 19, 2024

var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const port = "8081";
const host = "localhost";

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});


app.get("/", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
  .collection("fakestore_catalog")
  .find(query)
  .limit(100)
  .toArray();
  console.log(results);
  res.status(200);
});

app.get("/:id", async (req, res) => {
  const itemid = Number(req.params.id);
  console.log("Item to find :", itemid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = {"id": itemid };
  const results = await db.collection("fakestore_catalog")
  .findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
 });
    
app.post("/addItem", async (req, res) => {
  try{
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const newDocument = {
      "id": req.body.id, // also "id": req.body.id,
      "title": req.body.title, // also "name": req.body.name,
      "price": req.body.price, // also "price": req.body.price,
      "description": req.body.description, // also "description": req.body.description,
      "category": req.body.category, // also "imageUrl": req.body.imageUrl
      "image": req.body.image,
      "rating": {
        "rate": req.body.rate,
        "count": req.body.count
      }
    };
    console.log(newDocument);

    const results = await db
    .collection("fakestore_catalog")
    .insertOne(newDocument);
    res.status(200);
    res.send(results);
  }
  catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: 'An internal server error occurred' });
  }

 });

app.delete("/deleteItem/:id", async (req, res) => {
  try {
  const id = Number(req.params.id);
  await client.connect();
  console.log("Item to delete :",id);
  const query = { id: id };
  // delete
  const results = await db.collection("fakestore_catalog").deleteOne(query);
  res.status(200);
  res.send(results);

  }
  catch (error){
  console.error("Error deleting item:", error);
  res.status(500).send({ message: 'Internal Server Error' });
  }
  });

  app.put("/updateItem/:id", async (req, res) => {
    const id = Number(req.params.id);
    const query = { id: id };
    await client.connect();
    console.log("Item to Update :",id);
    // Data for updating the document, typically comes from the request body
    console.log(req.body);
    const updateData = {
    $set:{
    "price": req.body.price,
    }
    };
    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = { };
    const results = await db.collection("fakestore_catalog").updateOne(query, updateData, options);
    res.status(200);
    res.send(results);
    if (results.matchedCount === 0) {
      return res.status(404).send({ message: 'Item not found' });
    }
    });
 
