import "./styles/common.less";
import * as common from "./common.js";
import * as footer from "./footer.js";
import * as schedule from "./schedule.js";
import * as game from "./game.js";
import * as map from "./map.js";
import * as vfx from "./vfx.js";
import * as user from "./user.js";
import * as detail from "./detail.js";
import * as import_data from "./data.js";
var flag = false;

var data = {
  ui: {
    game: game.config,
    footer: footer.config,
    schedule: schedule.config,
    detail: detail.config
  },
  user: user.config,
  data: import_data.data
};

window.addEventListener("popstate", function(p) {
  var hash = window.location.hash;
  if (hash) {
    try {
      var js = JSON.parse(atob(hash.substr(1)));
      flag = true;
      console.log(js.footer.selection);
      data.ui = js;
      common.events.emit("rebind", data.ui);
    } catch (e) {}
  }
});

window.s = function(q) {
  data.ui.detail.data = q;
};

common.status.data = data;

function pushState() {
  history.pushState({}, null, "#" + btoa(JSON.stringify(data.ui)));
}

common.watch.ui = {
  deep: true,
  handler: function(val, old) {
    if (flag) return;
    flag = false;
    pushState();
  }
};

var app = new Vue({
  el: "#app",
  data: data,
  computed: common.computed,
  methods: common.methods,
  watch: common.watch
});

window.data = data;

var v = new vfx.vfx(document.querySelector("canvas"));
function update() {
  v.update();
  return requestAnimationFrame(update);
}

update();

$(window).ready(function() {
  var hash = window.location.hash;
  if (hash) {
    var js = JSON.parse(atob(hash.substr(1)));
    console.log(js);
    data.ui = js;
    common.events.emit("rebind", data.ui);
  } else {
    pushState();
  }
});
