import "./styles/common.less";
import * as footer from "./footer.js";
var data = {
  ui: {
    footer: footer.config
  }
};

var computed = {};

var app = new Vue({
  el: "#app",
  data: data,
  computed: computed
});

window.data = data;
