import "./styles/schedule.less";
import * as common from "./common.js";
export var config = {
  selection: 0
};

var swiper;
window.addEventListener("load", function() {
  swiper = new Swiper(".schedule .swiper-container", {
    onSlideChangeStart: function() {
      config.selection = swiper.realIndex; //double binding
    }
  });
});

common.methods.scheduleSelect = function(e) {
  config.selection = $(e.target).data("tab");
};

common.watch["ui.schedule.selection"] = function() {
  //reaction
  swiper.slideTo(config.selection);
};

common.events.on("rebind", function(ui) {
  config = ui.schedule;
});
