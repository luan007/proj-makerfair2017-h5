import "./styles/common.less";
import * as common from "./common.js";
import * as footer from "./footer.js";
import * as schedule from "./schedule.js";
import * as game from "./game.js";
import * as map from "./map.js";
import * as vfx from "./vfx.js";
import * as user from "./user.js";
import * as import_data from "./data.js";
var flag = false;

window.addEventListener("popstate", function(p) {
  var hash = window.location.hash;
  if (hash) {
    try {
      var js = JSON.parse(atob(hash.substr(1)));
      flag = true;
      data.ui = js;
      common.events.emit('rebind', data.ui);
    } catch (e) {}
  }
});

var data = {
  ui: {
    game: game.config,
    footer: footer.config,
    schedule: schedule.config
  },
  user: user.config,
  data: import_data.data
};


common.status.data = data;

function pushState() {
  history.pushState({}, null, "#" + btoa(JSON.stringify(data.ui)));
}
pushState();

common.watch.ui = {
  deep: true,
  handler: function(val, old) {
    // console.log(val);
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
