import * as common from "./common.js";

common.methods.collectedLength = function() {
  var t = 0;
  for (var i in config.badge) {
    t += config.badge[i] ? 1 : 0;
  }
  return t;
};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function defaultBadge() {
  return {
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false
  };
}

export var config = {
  uname: Cookies.get("user") || uuidv4(),
  badge: Cookies.get("badge") ? JSON.parse(Cookies.get("badge")) : defaultBadge()
};

common.methods.activateBadge = function(no) {
  defaultBadge[no] = true;
};

function update() {
  console.log("saveing");
  Cookies.set("user", config.uname);
  Cookies.set("badge", JSON.stringify(config.badge));
  // alert("save");
}

common.watch.user = {
  deep: true,
  handler: function() {
    update();
  }
};

update();
//
