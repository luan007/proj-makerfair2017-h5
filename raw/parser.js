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
  fs.writeFileSync(
    "keys.json",
    JSON.stringify({
      keys: spots
    }),
    "utf-8"
  );
});

parseXlsx("forum.xlsx", function(err, data) {
  var all = [];
  for (var i = 1; i < data.length; i++) {
    var dt1 = new Date((parseInt(data[i][0]) - (25567 + 2)) * 86400 * 1000);
    var dt2 = new Date((parseInt(data[i][0]) - (25567 + 2)) * 86400 * 1000);
    var h1 = parseInt(data[i][1].split("-")[0].split(":")[0]);
    var m1 = parseInt(data[i][1].split("-")[0].split(":")[1]);
    var h2 = parseInt(data[i][1].split("-")[1].split(":")[0]);
    var m2 = parseInt(data[i][1].split("-")[1].split(":")[1]);
    dt1.setHours(h1, m1);
    dt2.setHours(h2, m2);
    var tag = data[i][2];
    var title = data[i][3];
    var name = data[i][5];
    var job = data[i][6];
    all.push({
      id: all.length,
      tag: tag,
      title: title,
      name: name,
      job: job,
      from: dt1,
      to: dt2
    });
  }
  fs.writeFileSync("forum.json", JSON.stringify({ d: all }), "utf-8");
});

parseXlsx("stage.xlsx", function(err, data) {
  var all = [];
  for (var i = 1; i < data.length; i++) {
    var m = parseInt(data[i][0].trim().split(" ")[0]);
    var d = parseInt(data[i][0].trim().split(" ")[1]);
    var dt = new Date(0);
    dt.setFullYear(2017, m - 1, d);
    var dt1 = new Date(dt.getTime());
    var dt2 = new Date(dt.getTime());
    var h1 = parseInt(data[i][1].split("-")[0].split(":")[0]);
    var m1 = parseInt(data[i][1].split("-")[0].split(":")[1]);
    var h2 = parseInt(data[i][1].split("-")[1].split(":")[0]);
    var m2 = parseInt(data[i][1].split("-")[1].split(":")[1]);
    dt1.setHours(h1, m1);
    dt2.setHours(h2, m2);
    var title = data[i][2];
    var desc = data[i][3];
    var misc = data[i][4];
    all.push({
      title: title,
      desc: desc,
      misc: misc,
      from: dt1,
      to: dt2
    });
  }
  all.sort((a, b) => {
    return a.from > b.from;
  });
  fs.writeFileSync("stage.json", JSON.stringify({ d: all }), "utf-8");
});
