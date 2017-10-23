function setInkblot() {

var margin = {top: 20, right: 20, bottom: 20, left: 20}
  , width = 760
  , height = 120

function chart(selection) {
  selection.each(function(data) {

  var svg = d3.select(this);

  var g = svg.append("g")
      .attr("class", "circleWrapper")
      .style("filter", "url(#gooeyCodeFilter)");

  var n = 300;

  var x = d3.scaleLinear()
      .range([0, width/3])
      .domain([0, 1 ]);

  var y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, n]);

  var sizeScale = d3.scaleLinear()
      .domain([0,1])
      .range([10, 40])

  var colorScale = d3.scaleSequential(d3.interpolateCool)
        .domain([0, 1]);
    
  var dataset = d3.range(n).map(function() { return Math.random(); })                           
    
  var left = g.append("g")
        .attr("transform", "translate(" + width/2 + "," + margin.top + ")");
    
  left.selectAll(".left-circles")
      .data(dataset)
    .enter().append("circle")
      .attr("class","left-circles")
        .transition()
        .delay(function(d,i) { return i*10 })
        .duration(2000)
      .attr("r", function(d, i) { return sizeScale(d); })
      .attr("cx", function(d, i) { return x(d); })
      .attr("cy", function(d, i) { return y(i); })
      .style("fill", function(d, i) { return colorScale(d); })
      .attr("transform", "scale(1, 1)");

  var right = g.append("g")
        .attr("transform", "translate(" + width/2 + "," + margin.top + ")")
    
   right.selectAll(".right-circles")
      .data(dataset)
    .enter().append("circle")
      .attr("class","right-circles")
        .transition()
        .delay(function(d,i) { return i*10 })
        .duration(2000)
      .attr("r", function(d, i) { return sizeScale(d); })
      .attr("cx", function(d, i) { return x(d); })
      .attr("cy", function(d, i) { return y(i); })
      .style("fill", function(d, i) { return colorScale(d); })
      .attr("transform", "scale(-1, 1)");

  var interpolators = [
      "Viridis",
      "Inferno",
      "Magma",
      "Plasma",
      "Warm",
      "Cool",
      "Rainbow",
      "CubehelixDefault"
      ]

  var colorIndex = 0;
  function update() {

    var colorScale = d3.scaleSequential(d3["interpolate" + interpolators[colorIndex]])
        .domain([0, 1]);

    if(colorIndex == (interpolators.length-1)) {
      colorIndex = 0;
    } else {
      colorIndex += 1;
    }
    
      // Get the data again   
      var newdata = d3.range(n).map(function() { return d3.randomUniform(1)(); });

      d3.selectAll(".left-circles")
        .data(newdata)
        .transition()
        .delay(function(d,i) { return i*10 })
        .duration(2000)
        .attr("r", function(d, i) { return sizeScale(d); })
        .style("fill", function(d, i) { return colorScale(d); })
        .attr("cx", function(d, i) { return x(d); })
        .attr("cy", function(d, i) { return y(i); });

        d3.selectAll(".right-circles")
        .data(newdata)
        .transition()
        .delay(function(d,i) { return i*10 })
        .duration(2000)
        .attr("r", function(d, i) { return sizeScale(d); })
        .style("fill", function(d, i) { return colorScale(d); })
        .attr("cx", function(d, i) { return x(d); })
        .attr("cy", function(d, i) { return y(i); });

  }

  window.windowTimer = d3.interval(update, 2000);

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

return chart;
}