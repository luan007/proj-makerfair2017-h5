import "./styles/schedule.less";
import * as common from "./common.js";
export var config = {
  selection: 0
};

var swiper;
window.addEventListener("load", function() {
  swiper = new Swiper(".schedule .swiper-container", {
    onSlideChangeStart: function() {
      config.selection = (swiper.realIndex); //double binding
    }
  });
});

common.watch["ui.schedule.selection"] = function() {
  //reaction
  swiper.slideTo(config.selection);
};

$(document).ready(function() {
  $(".schedule .holder > div").on("mousedown", function() {
    config.selection = $(this).data("tab");
  });
});

common.events.on('rebind', function(ui) {
  config = ui.schedule
});