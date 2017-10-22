 function setBubbles() {

  var margin = {top: 20, right: 20, bottom: 20, left: 20}
    , width = 760
    , height = 120
    , colorScale = d3.scaleOrdinal().range(["#007f7e", "#ffab00", "#ff6500", "#018d73", "#ff4700"])

  function chart(selection) {
    selection.each(function(data) {

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0,1])

    var y2 = d3.scaleLinear()
        .range([height-height/4, height/4])
        .domain([0,1])

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0,1])

    var svg = d3.select(this);

    window.windowTimer = d3.interval(function(elapsed) {

        var n = elapsed/400 > 400 ? 100 : elapsed/400;

        svg.selectAll(".dots")
           .data(d3.range(n).map(Object))
         .enter().append("circle")
           .attr("class", "dots")
           .style("fill", "none")
           .style("stroke", "#2f3337")
           .style("stroke-width", 1.5)
           .attr("cx", function() { return x(Math.random()); })
           .attr("cy", function(d) { d.y = height; return d.y; })
           .on("mouseenter", function() {
             d3.select(this)
             .transition()
             .duration(5000)
             .ease(d3.easeElastic)
             .attr("r", function() { return 400*Math.random() })
             .attr("cy", function(d) { return y2(Math.random()); })
             .style("stroke-dasharray", "2, 3, 4, 5, 6")
             .transition()
             .duration(1000)
             .ease(d3.easeLinear)
             .style("stroke-dasharray", "4, 5, 6, 7, 8")
             .style("opacity", .01)
             .duration(1000)
             .transition().remove()
            })
           .transition()
           .duration(100)
           .delay(function(d, i) { return i*100 })
           .attr("r", 2)
           .transition()
           .duration(3000)
           .ease(d3.easeElastic)
           .duration(function() { return 10000*Math.random() })
           .style("fill", function() { return colorScale(Math.random()); })
           .attr("r", function() { return 50*Math.random()})
           .attr("cy", function(d) {d.y = d.y - y(Math.random()); return d.y; })
           .style("stroke-width", 2)
        
        }, 500*Math.random());

    });
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
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

  chart.colorScale = function(_) {
    if (!arguments.length) return colorScale;
    colorScale = _;
    return chart;
  };

  return chart;
}