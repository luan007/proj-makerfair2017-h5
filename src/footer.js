import "./styles/footer.less";

export var config = {
  autoHide: true,
  visible: true,
  threshold: 2,
  selection: 0
};

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
  $("#footer > div").on("mousedown", function() {
    config.selection = $(this).data("tab");
  });
  updateScroll();
});

window.addEventListener("scroll", function(e) {
  updateScroll();
});
