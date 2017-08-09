import "./styles/schedule.less";
import * as common from "./common.js";
export var config = {
  selection: 0
};

var swiper;
var initS = null;
window.addEventListener("load", function() {
  swiper = new Swiper(".schedule .swiper-container", {
    onSlideChangeStart: function() {
      config.selection = swiper.realIndex; //double binding
    }
  });

  if (initS != null) {
    swiper.slideTo(config.selection);
  }
});

common.watch["ui.schedule.selection"] = function() {
  //reaction
  if (swiper) {
    swiper.slideTo(config.selection);
  } else {
    initS = config.selection;
  }
};

$(document).ready(function() {
  $(".schedule .holder > div").on("mousedown", function() {
    config.selection = $(this).data("tab");
  });
});

common.events.on("rebind", function(ui) {
  config = ui.schedule;
});
