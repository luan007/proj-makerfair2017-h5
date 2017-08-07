import "./styles/common.less";
import * as common from "./common.js";
import * as footer from "./footer.js";
import * as schedule from "./schedule.js";
import * as game from "./game.js";
import * as map from "./map.js";
import * as vfx from "./vfx.js";

var data = {
  ui: {
    game: game.config,
    footer: footer.config,
    schedule: schedule.config
  }
};

common.status.data = data;

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
