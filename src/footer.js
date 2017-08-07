import "./styles/footer.less";
import * as common from "./common.js";

common.methods.footerSelection = function(e) {
  config.selection = $(e.target).data("tab");
};

export var config = {
  autoHide: true,
  visible: true,
  threshold: 2,
  selection: 0
};


common.events.on('rebind', function(ui) {
  config = ui.footer
});


var prevY = 0;

function updateScroll() {
  var realHeight =
    document.scrollingElement.scrollHeight -
    document.scrollingElement.clientHeight;
  var curScroll = window.scrollY;
  var dScroll = curScroll - prevY;
  prevY = curScroll;

  if (config.autoHide) {
    config.visible =
      curScroll < config.threshold || realHeight - curScroll < config.threshold; // ||
    //   (dScroll < 0 && dScroll > -2);
  } else {
  }
}

$(document).ready(function() {
  updateScroll();
});

window.addEventListener("scroll", function(e) {
  updateScroll();
});
