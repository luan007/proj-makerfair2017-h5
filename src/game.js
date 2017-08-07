import "./styles/game.less";
import * as common from "./common.js";
export var config = {
  selection: 0
};

var swiper;
window.addEventListener("load", function() {
  swiper = new Swiper(".game .swiper-container", {
    onSlideChangeStart: function() {
      config.selection = swiper.realIndex; //double binding
    }
  });
});

common.watch["ui.game.selection"] = function() {
  //reaction
  swiper.slideTo(config.selection);
};

$(document).ready(function() {
  $(".game .holder > div").on("mousedown", function() {
    config.selection = $(this).data("tab");
  });
});
