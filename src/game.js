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

function isNear(id) {
  return common.wechat.near && data.ble[common.wechat.near.key] == id;
}

function activate(id) {
  if (data.keys_arr.indexOf(id) >= 0) {
    user.config.badge[data.keys_arr.indexOf(id)] = true;
    alert("恭喜您，您已解锁该零件！");
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
common.methods.isNear = isNear;

common.methods.collectBadge = function(targetId) {
  // if (!common.wechat.near) {
  //   return; //
  // }
  // if (!isTargetPresent(targetId)) {
  //   return;
  // }
  if (isActivated(targetId)) return;
  wx.scanQRCode({
    needResult: 1,
    scanType: ["barCode"],
    desc: "scanQRCode desc",
    success: function(res) {
      if (res.resultStr.indexOf("CODE_128,") == 0) {
        var code = res.resultStr.substring("CODE_128,".length);
        if (data.code[code] == targetId) {
          // alert(targetId);
          activate(targetId);
        }
      } else {
        for (var i in data.code) {
          if (res.resultStr.indexOf(i) >= 0) {
            return activate(targetId);
          }
        }
      }
    }
  });
};

var swiper;
var initS = null;
window.addEventListener("load", function() {
  swiper = new Swiper(".game .swiper-container", {
    onSlideChangeStart: function() {
      config.selection = swiper.realIndex; //double binding
    }
  });

  if (initS != null) {
    swiper.slideTo(config.selection);
  }
});

common.watch["ui.game.selection"] = function() {
  //reaction
  if (swiper) {
    swiper.slideTo(config.selection);
  } else {
    initS = config.selection;
  }
};

$(document).ready(function() {
  $(".game .holder > div").on("mousedown", function() {
    config.selection = $(this).data("tab");
  });
});

common.events.on("rebind", function(ui) {
  config = ui.game;
});
