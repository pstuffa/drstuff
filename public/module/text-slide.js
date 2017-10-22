function setTextSlide() {

var margin = {top: 20, right: 20, bottom: 20, left: 20}
  , width = 760
  , height = 120
  , firstWords = ["paul","small","tall","dr"]
  , lastWords = ["buffa", "stuffa", "ruffa", "gruffa"];

function chart(selection) {
  selection.each(function(data) {

    var svg = d3.select(this);

    var firstWord = svg.append("text")
        .attr("class", "firstWord")
        .attr("y", 100)
        .attr("x", 100)
        .style("text-anchor", "end")
        .text(firstWords[Math.floor(Math.random()*4)])

    var lastWord = svg.append("text")
        .attr("class", "lastWord")
        .attr("y", 100)
        .attr("x", 102)
        .style("text-anchor", "start")
        .text(lastWords[Math.floor(Math.random()*4)])

    d3.interval(function(elapsed) {

        firstWord.transition()
          .duration(1000)
          .attr("y", -100)
          .style("opacity", 0)
          .transition()
          .duration(100)
          .attr("y", 100)
          .text(firstWords[Math.floor(Math.random()*4)])
          .transition()
          .duration(1000)
          .style("opacity", 1);
        
        }, 4000);

     d3.timeout(function() {
       d3.interval(function(elapsed) {

          lastWord.transition()
            .duration(1000)
            .attr("y", height+100)
            .style("opacity", 0)
            .transition()
            .duration(100)
            .attr("y", 100)
            .text(lastWords[Math.floor(Math.random()*4)])
            .transition()
            .duration(1000)
            .style("opacity", 1);
          
          }, 4000)
      }, 2000);

  });
}

chart.margin = function(_) {
  if (!arguments.length) return margin;
  margin = _;
  return chart;
};

chart.firstWords = function(_) {
  if (!arguments.length) return firstWords;
  firstWords = _;
  return chart;
};

chart.lastWords = function(_) {
  if (!arguments.length) return lastWords;
  lastWords = _;
  return chart;
};

chart.width = function(_) {
  if (!arguments.length) return width;
  width = _;
  return chart;
};

chart.height = function(_) {
  if (!arguments.length) return height;
  height = _;
  return chart;
};

return chart;
}