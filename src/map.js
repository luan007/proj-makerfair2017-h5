import "./styles/map.less";
import * as common from "./common.js";

import * as d3 from "d3";

import * as panzoom from "panzoom";
export var config = {};

var view;
var tx = 0;
var ty = 0;
var ts = 0;
var curX = 0;
var curY = 0;
var curS = 0;

var thres = 0.01;
var ease = 0.7;

export function update() {
  if (!view) return;
  // curX = Math.abs(tx - curX) < thres ? tx : curX + (tx - curX) * ease;
  // curY = Math.abs(ty - curY) < thres ? ty : curY + (ty - curY) * ease;
  // curS = Math.abs(ts - curS) < thres ? ts : curS + (ts - curS) * ease;
  // if (curX != tx || curY != ty || curS != ts) {
  //   view.attr("transform", `translate(${curX}, ${curY}) scale(${curS})`);
  // }
}
var child;
common.watch["ui.detail.data"] = function() {
  if (!child) return;
  // child.remove();
  // setTimeout(function(){
  //   document.getElementById("svgContainer").appendChild(child);
  // }, 10); //TODO: Optimize this
};

window.addEventListener("load", () => {
  d3.xml("assets/main.svg").get(function(error, xml) {
    if (error) throw error;
    child = xml.documentElement;
    document.getElementById("svgContainer").appendChild(child);
    document.querySelector("svg").addEventListener("mousedown", function(e){
      e.stopPropagation();
      e.stopImmediatePropagation();
      e.preventDefault();
    });
    var svg = d3.select("svg");
    svg.attr("class", "stage1");
    var zoom = d3.zoom()
      // .scaleExtent([1, 40])
      // .translateExtent([[-1000, -1000], [1000, 1000]])
      .on("zoom", zoomed);

    // var view = svg
    //   .append("rect")
    //   .attr("class", "view")
    //   .attr("x", 0)
    //   .attr("y", 0)
    //   .attr("width", 100)
    //   .attr("height", 100);

    view = d3.select("svg > g");

    $("*[data-name='CLICKS'] > *").on("click", function(e) {
      // setTimeout(() => {
      //   console.log("end");
      var q = $(this).attr("data-name").toUpperCase();
      if (q.indexOf("-") == -1) {
        q = q[0] + "-" + q.substr(1);
      }
      var j = queryPos(q);
      var n = queryKey(j.key);
      console.log(j, n);
      common.methods.showDetail(j, n);
      // }, 50);
    });

    // var g = document.querySelector("svg > g");

    // var pan = panzoom.default(document.querySelector("svg > g"));

    // var flag = false;
    // document.body.addEventListener("panend", function(e) {
    //   console.log("pan");
    //   flag = true;
    //   clearTimeout(ftimeout);
    //   ftimeout = setTimeout(function() {
    //     flag = false;
    //     console.log("save");
    //   }, 100);
    // });

    // var ftimeout;
    // document.body.addEventListener("zoom", function(e) {
    //   clearTimeout(ftimeout);
    //   flag = true;
    //   clearTimeout(ftimeout);
    //   ftimeout = setTimeout(function() {
    //     flag = false;
    //     console.log("save");
    //   }, 100);
    //   var s = pan.getTransform().scale;
    //   if (s < 2) {
    //     $("svg").addClass("stage1");
    //     $("svg").removeClass("stage2");
    //     $("svg").removeClass("stage3");
    //   } else if (s < 6) {
    //     $("svg").addClass("stage2");
    //     $("svg").removeClass("stage1");
    //     $("svg").removeClass("stage3");
    //   } else {
    //     $("svg").addClass("stage3");
    //     $("svg").removeClass("stage2");
    //     $("svg").removeClass("stage1");
    //   }
    // });

    function zoomed() {
      var s = (ts = d3.event.transform.k);
      tx = d3.event.transform.x;
      ty = d3.event.transform.y;
      if (s < 2) {
        $("svg").addClass("stage1");
        $("svg").removeClass("stage2");
        $("svg").removeClass("stage3");
      } else if (s < 6) {
        $("svg").addClass("stage2");
        $("svg").removeClass("stage1");
        $("svg").removeClass("stage3");
      } else {
        $("svg").addClass("stage3");
        $("svg").removeClass("stage2");
        $("svg").removeClass("stage1");
      }
      view.attr("transform", d3.event.transform);
    }
    svg.call(zoom);
  });
});
