import "./styles/common.less";
import * as footer from "./footer.js";
import * as schedule from "./schedule.js";
import * as common from "./common.js";

var data = {
  ui: {
    footer: footer.config,
    schedule: schedule.config
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
