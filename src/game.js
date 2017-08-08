import "./styles/game.less";
import * as common from "./common.js";
import { data } from "./data.js";
export var config = {
  selection: 0
};

var STRICT = 1;
common.methods.collectBadge = function() {
  if (!common.wechat.near) {
    return; //
  }
  wx.scanQRCode({
    needResult: 1,
    scanType: ["barCode"],
    desc: "scanQRCode desc",
    success: function(res) {
      if (res.resultStr.indexOf("CODE_128,") == 0) {
        var code = res.resultStr.substring("CODE_128,".length);
        //common.wechat.scannedCode = code;
        //check nearby?
        // alert(code);
        if (common.wechat.near) {
          var k = common.wechat.near.key;
          if (
            STRICT == 1 &&
            data.code[code] == data.ble[common.wechat.near.key]
          ) {
            //strict
          } else if (STRICT == 0) {
            for (var i = 0; i < common.wechat.bleSignal.length; i++) {
              var b = common.wechat.bleSignal.key;
              if (data.code[code] == data.ble[b.key]) {
                
              }
            }
          }
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
