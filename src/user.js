import * as common from "./common.js";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function defaultBadge() {
  return {
  };
}

export var config = {
  uname: Cookies.get("user") || uuidv4(),
  badge: Cookies.get("badge")
    ? JSON.parse(Cookies.get("badge"))
    : defaultBadge()
};

common.methods.activateBadge = function(no) {
  defaultBadge[no] = true;
};

console.log(config);

function update() {
  console.log("saveing");
  Cookies.set("user", config.uname);
  Cookies.set("badge", JSON.stringify(config.badge));
}

common.watch.user = {
  deep: true,
  handler: function() {
    update();
  }
};

update();
//
