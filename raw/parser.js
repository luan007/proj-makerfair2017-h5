var fs = require("fs");
var parseXlsx = require("excel");

parseXlsx("spots.xlsx", function(err, data) {
  if (err) throw err;
  // data is an array of array
  var spots = {};
  var spots_arr = [];

  var prev = undefined;
  var key = "";

  function add(prev, key) {
    var obj = {
      name: prev[1],
      key: key,
      intro: prev[2]
    };
    spots_arr.push(obj);
    spots[key] = obj;
  }
  for (var i = 0; i < data.length; i++) {
    if (!prev || data[i][1]) {
      if (prev) {
        add(prev, key);
      }
      prev = data[i];
      key = data[i][0];
    } else {
      key += "," + data[i][0];
    }
  }
  add(prev, key);

  fs.writeFileSync(
    "spots.json",
    JSON.stringify({
      spots: spots,
      spots_arr: spots_arr
    }),
    "utf-8"
  );
});

parseXlsx("keys.xlsx", function(err, data) {
  var spots = {};
  for (var i = 0; i < data.length; i++) {
    var obj = {
      key: data[i][0],
      desc: data[i][1],
      rule: data[i][2]
    };
    spots[obj.key] = obj;
  }
  console.log(spots);
  fs.writeFileSync(
    "keys.json",
    JSON.stringify({
      keys: spots
    }),
    "utf-8"
  );
});
