import * as forum from "../raw/forum.json";
import * as keys from "../raw/keys.json";
import * as spots from "../raw/spots.json";
import * as stage from "../raw/stage.json";

export var data = {
  keys: keys.keys,
  spots: spots.spots,
  spots_arr: spots.spots_arr,
  stage: stage.d,
  forum: forum.d
};

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
  return d.getHours() + ":" + d.getMinutes();
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
