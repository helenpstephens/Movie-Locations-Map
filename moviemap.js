const config = require('./config.js');

/*
    Express.js
*/
const express = require('express');
const app = express();

/*
    MonogDB
*/
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const client = new MongoClient(config.url, { useNewUrlParser: true });

// Connect to mongo client
client.connect((err) => {
    // Test err is null
    assert.equal(null, err);
    console.log("Connected successfully to server");

   
});

// Serve static content in ./public
app.use(express.static(__dirname + '/public'));

app.get("/coords", (req, res) => {  
    var coords = client.db(config.dbName).collection("coords");
    
    coords.find({}).toArray((err, docs) => {
        if (err) {
            console.log(err);
            res.end();
            return;
        }

        res.writeHead(200, {"content-type": "application/json"});
        res.write(JSON.stringify(docs));
        res.end();
    });
});
//write to database

const mongoose = require('mongoose');
mongoose.promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/moviemap");


const coordSchema = new mongoose.Schema({
  lng: {
    type: String,
    trim: true,   
  },
  lat: {
    type: String,
    trim: true,   
  },
  film: {
    type: String,
    trim: true,
  },
  info: {
    type: String,
    trim: true,
  },
  visited: {
    type: String,
    trim: true,
  },
});

var coords = mongoose.model("coords", coordSchema);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/location",(req, res) => {
var newCoord = new coords(req.body);
 newCoord.save()
 .then(item => {
 res.send("item saved to database");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});

     
app.listen(8080, () => console.log("Starting server"));
