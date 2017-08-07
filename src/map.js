import "./styles/map.less";

import * as d3 from "d3";

export var config = {};

window.addEventListener("load", () => {
  var svg = d3.select("svg");

  var zoom = d3
    .zoom()
    //   .scaleExtent([1, 40])
    //   .translateExtent([[-1000, -1000], [1000, 1000]])
    .on("zoom", zoomed);

  //   var view = svg
  //     .append("rect")
  //     .attr("class", "view")
  //     .attr("x", 0)
  //     .attr("y", 0)
  //     .attr("width", 100)
  //     .attr("height", 100);

  var view = d3.select("#g4");

  function zoomed() {
    var s = d3.event.transform.k;
    if(s < 0.5) {
        $(".d1").addClass("v");
        $(".d2").removeClass("v");
        $(".d3").removeClass("v");
    } else if(s < 1.5) {
        $(".d2").addClass("v");
        $(".d1").removeClass("v");
        $(".d3").removeClass("v");
    } else {
        $(".d3").addClass("v");
        $(".d2").removeClass("v");
        $(".d1").removeClass("v");
    }
    view.attr("transform", d3.event.transform);
    // console.log("!");
    //   gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
    //   gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
  }

  svg.call(zoom);
});
