import "./styles/game.less";
import * as common from "./common.js";
import { data } from "./data.js";
import * as user from "./user.js";
export var config = {
  selection: 0
};

function isActivated(id) {
  var i = Object.keys(data.keys).indexOf(id);
  if (i < 0) return false;
  return !!user.config.badge[i];
}

function activate(id) {
  if (data.keys_arr.indexOf(id) >= 0) {
    user.config.badge[data.keys_arr.indexOf(id)] = true;
  }
}

var STRICT = 0;
function isTargetPresent(targetId) {
  if (STRICT) {
    return common.wechat.near && data.ble[common.wechat.near.key] == targetId;
  }
  for (var i in common.wechat.bleSignal) {
    if (data.ble[common.wechat.bleSignal[i].key] == targetId) {
      return true;
    }
  }
  return false;
}

common.methods.isTargetPresent = isTargetPresent;
common.methods.isActivated = isActivated;

common.methods.collectBadge = function(targetId) {
  if (!common.wechat.near) {
    return; //
  }
  if (!isTargetPresent(targetId)) {
    return;
  }
  if (isActivated(targetId)) return;
  wx.scanQRCode({
    needResult: 1,
    scanType: ["barCode"],
    desc: "scanQRCode desc",
    success: function(res) {
      if (res.resultStr.indexOf("CODE_128,") == 0) {
        var code = res.resultStr.substring("CODE_128,".length);
        if (isTargetPresent(targetId) && data.code[code] == targetId) {
          alert(targetId);
          activate(targetId);
        }
      }
    }
  });
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

common.events.on("rebind", function(ui) {
  config = ui.game;
});
