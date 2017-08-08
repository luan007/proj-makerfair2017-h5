
// alert('in');
var LOCAL = "debug.com";
//var LOCAL = "circuitpot.com"

$.post(
  "http://"+LOCAL+":13000/config",
  {
    url: window.location.href
  },
  function(data) {
    // alert(data);
    // window.data.statusMessage = "微信服务验证中..";
    var cfg = {
      debug: false,
      appId: data.appId,
      timestamp: Number(data.timestamp),
      nonceStr: data.noncestr,
      signature: data.signature,
      jsApiList: [
        "startSearchBeacons",
        "stopSearchBeacons",
        "onSearchBeacons",
        "onMenuShareAppMessage",
        "onMenuShareTimeline",
        "scanQRCode"
      ]
    };

    // log("config interface ok");
    wx.config(cfg);
    // alert(cfg);
    // log("wx.config..");
    wx.ready(function(e) {
      // log("wx.ready");
      // alert(e);

      // window.data.statusMessage = "微信服务在线..";
      wx.onMenuShareTimeline({
        title: "Mercedes meStore", // 分享标题
        link: "http://circuitpot.com/intel/", // 分享链接
        imgUrl: "http://circuitpot.com/mestore/logo.png?random123", // 分享图标
        success: function() {
          // 用户确认分享后执行的回调函数
          // jlog("share_timeline", true);
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          // jlog("share_timeline", false);
        }
      });

      wx.onMenuShareAppMessage({
        title: "Mercedes meStore", // 分享标题
        link: "http://circuitpot.com/mestore/", // 分享链接
        imgUrl: "http://circuitpot.com/mestore/logo.png?random123", // 分享图标
        desc: "", // 分享描述
        type: "link", // 分享类型,music、video或link，不填默认为link
        success: function() {
          // 用户确认分享后执行的回调函数
          // alert("!");
          // jlog("share_msg", true);
        },
        cancel: function() {
          // 用户取消分享后执行的回调函数
          // jlog("share_msg", false);
        }
      });

      var firsttry = true;
      var success = false;
      // log("wx.start search for beacon");

      function tryOpen() {
        wx.startSearchBeacons({
          complete: function(dt) {
            // log("wx.complete");
            // log(JSON.stringify(dt));

            if (dt.errMsg && dt.errMsg.indexOf("power off") >= 0) {
              // $("#alertbt").css("opacity", "1");
              alert("请开启蓝牙 以使用页面功能 | Please turn-on Bluetooth");

              // log("wx.retry..");
              // window.data.statusMessage = " * 蓝牙未打开 * ";
              firsttry = false;
              wx.stopSearchBeacons({
                complete: function(dt) {
                  setTimeout(tryOpen, 3500);
                }
              });
            } else {
              success = true;
              // log("wx.beacon is up");
              // window.data.statusMessage = "";
            }
          }
        });
      }
      tryOpen();
      // window.data.statusMessage = "服务联机..正在启动蓝牙";

      wx.onSearchBeacons({
        complete: function(dt) {
          // log("beacon event..");
          var beacons = dt.beacons;
          var q = {};
          for (var i = 0; i < beacons.length; i++) {
            if (beacons[i].rssi + "" == "0") {
              continue;
            }
            var mr = beacons[i].major + ":" + beacons[i].minor;
            q[mr] = {
              rssi: parseInt(beacons[i].rssi),
              proximity: beacons[i].proximity
            };
          }
          console.log(q);
          // updateRssiList(q);
          // jlog("loc", dt);
          // if (window.location.hash.indexOf("raw") >= 0) {
          //   $("#debug").html(JSON.stringify(q));
          // }
        }
      });
    });
  }
);
