import * as forum from "../raw/forum.json";
import * as keys from "../raw/keys.json";
import * as spots from "../raw/spots.json";
import * as stage from "../raw/stage.json";

export var data = {
  keys: keys.keys,
  spots: spots.spots,
  spots_arr: spots.spots_arr,
  stage: stage.d,
  forum: forum.d,
  ble: {
    "10102:59409": "A-39",
    "10102:59402": "A-38",
    "10102:59400": "B-18",
    "10102:59403": "B-13",
    "10102:59406": "C-19",
    "10102:59407": "D-02",
    "10102:59405": "D-03",
    "10102:59404": "D-13",
    "10102:59408": "D-11",
    "10102:59401": "D-12"
  }, 
  code: {
    "A-39:AwYNAw0MA": "A-39",
    "A-38:AwEPCwsGD": "A-38",
    "B-18:qwkMCAsBA": "B-18",
    "B-13:fAUOCQQJD": "B-13",
    "C-19:iwMLCAIHD": "C-19",
    "D-02:rgMBAQMGD": "D-02",
    "D-03:CgsBCgcBB": "D-03",
    "D-13:BwUKBg0PD": "D-13",
    "D-11:CQAHDAULC": "D-11",
    "D-12:3g4MBwwOA": "D-12"
  }
};

// console.log(Object.keys(data.keys));

for (var f in data) {
  for (var j in data[f]) {
    var q = data[f][j];
    if (q.from) {
      q.from = new Date(q.from);
      q.from_str = getTimeStr(q.from);
      q.from_dstr = getDateStr(q.from);
    }
    if (q.to) {
      q.to = new Date(q.to);
      q.to_str = getTimeStr(q.to);
      q.to_dstr = getDateStr(q.from);
    }
  }
}

data.day_stage = days(data.stage);
data.day_forum = days(data.forum);

function getTimeStr(d) {
  return (
    ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
  );
}

function getDateStr(d) {
  return d.getMonth() + 1 + "月" + d.getDate() + "日";
}

//wash data
function days(arr) {
  arr.sort(function(a, b) {
    return a.to - b.to;
  });
  //return days
  var d = {};
  for (var i = 0; i < arr.length; i++) {
    var cur = arr[i];
    d[cur.from_dstr] = d[cur.from_dstr] || [];
    d[cur.from_dstr].push(cur);
  }
  return d;
}

window.queryPos = function(d) {
  for (var i in data.spots) {
    if (i == d || i.split(",").indexOf(d) >= 0) {
      return data.spots[i];
    }
  }
  console.log(d, "not found");
  return undefined;
};
