function setTextSlide() {

var margin = {top: 20, right: 20, bottom: 20, left: 20}
  , width = 760
  , height = 120
  , firstWords = ["paul","p"]
  , lastWords = ["buffa", "stuffa"];

function chart(selection) {
  selection.each(function(data) {

    var svg = d3.select(this);

     var projects = svg.append("a")
        .attr("xlink:href", "/projects")
        .append("text")
        .text("projects")
        .attr("y", 100)
        .attr("x", width-50)
        .style("text-anchor", "end")
        .style("font-size", 30)
        .on("mouseenter", function() { 
          d3.select(this).style("stroke", window.fontColor)
        })
        .on("mouseleave", function() { 
          d3.select(this).style("stroke", "none")
        });
        // .append("a")

     // var projects = svg.append("a")
     //    .attr("xlink:href", "/me")
     //    .append("text")
     //    .text("about me")
     //    .attr("y", 140)
     //    .attr("x", width-50)
     //    .style("text-anchor", "end")
     //    .style("font-size", 30)
     //    .on("mouseenter", function() { 
     //      d3.select(this).style("stroke", window.fontColor)
     //    })
     //    .on("mouseleave", function() { 
     //      d3.select(this).style("stroke", "none")
     //    });

    var firstWord = svg.append("text")
        .attr("class", "firstWord")
        .attr("y", 100)
        .attr("x", 100)
        .style("text-anchor", "end")
        .text(firstWords[0])

    var lastWord = svg.append("text")
        .attr("class", "lastWord")
        .attr("y", 100)
        .attr("x", 102)
        .style("text-anchor", "start")
        .text(lastWords[0])

    var firstTimer = 0;
    d3.interval(function(elapsed) {

      firstTimer = (firstTimer == 0 ? 1 : 0);
        firstWord.transition()
          .duration(1000)
          .attr("y", -100)
          .style("opacity", 0)
          .transition()
          .duration(100)
          .attr("y", 100)
          .text(firstWords[firstTimer])
          .transition()
          .duration(1000)
          .style("opacity", 1)
          .style("fill", window.fontColor);
        
        }, 4000);

    var secondTimer = 0;
     d3.timeout(function() {
       d3.interval(function(elapsed) {

        secondTimer = (secondTimer == 0 ? 1 : 0);
          lastWord.transition()
            .duration(1000)
            .attr("y", height+100)
            .style("opacity", 0)
            .transition()
            .duration(100)
            .attr("y", 100)
            .text(lastWords[secondTimer])
            .transition()
            .duration(1000)
            .style("opacity", 1)
            .style("fill", window.fontColor);
          
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