var express = require("express");
var cors = require("cors");
var fs = require("fs");
var bodyParser = require("body-parser");

var db = {
  user_votes: {},
  items: {}
};

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("OK").end();
});

app.post("/view", (req, res) => {
  console.log("POST /view");
  var body = req.body;
  if (!body || !body.uuid) {
    return res.status(500).end();
  }
  if (!db.user_votes[req.body.uuid]) {
    db.user_votes[req.body.uuid] = db.user_votes[req.body.uuid] || {};
    save();
  }
  res
    .status(200)
    .json({
      my: db.user_votes[req.body.uuid],
      all: db.items
    })
    .end();
});
app.post("/vote", (req, res) => {
  console.log("POST /vote");
  //check user
  var body = req.body;
  if (!body || !body.uuid || !body.target) {
    return res.status(500).end();
  }
  var uuid = body.uuid;
  var target = body.target;
  if (!db.user_votes[req.body.uuid] || db.items[req.body.target] == undefined) {
    db.user_votes[req.body.uuid] = db.user_votes[req.body.uuid] || {};
    db.items[req.body.target] =
      db.items[req.body.target] == undefined ? 0 : db.items[req.body.target];
    save();
  }
  if (db.user_votes[uuid][target]) {
    db.user_votes[uuid][target] = false;
    db.items[req.body.target]--;
    save();
  } else {
    db.user_votes[uuid][target] = true;
    db.items[req.body.target]++;
    save();
  }

  return res
    .status(200)
    .json({
      my: db.user_votes[req.body.uuid],
      all: db.items
    })
    .end();
});

function save() {
  try {
    fs.writeFileSync("./db.json", JSON.stringify(db), "utf8");
  } catch (e) {}
}

function reload() {
  try {
    if (!fs.existsSync("./db.json")) {
      save();
    }
    var d = JSON.parse(fs.readFileSync("./db.json", "utf8"));
    db = d;
  } catch (e) {}
}

reload();

app.listen(7776);
