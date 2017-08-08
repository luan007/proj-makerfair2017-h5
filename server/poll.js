var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyparaser = require("body-parser");

var db = {
  user_votes: {},
  items: {}
};

var app = express();
app.use(cors());

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("OK").end();
});

app.get("/votes", (req, res) => {
  console.log("GET /votes");
  res.status(200).json(db.items).end();
});
app.post("/vote", (req, res) => {
  console.log("POST /vote");
  //check user
  
});

function save() {
  fs.writeFileSync("./db.json", JSON.stringify(db), "utf8");
}

function reload() {
  var d = JSON.parse(fs.readFileSync("./db.json", "utf8"));
  db = d;
}

reload();
