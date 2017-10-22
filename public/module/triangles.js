 function setTriangles() {

  var margin = {top: 20, right: 20, bottom: 20, left: 20}
    , width = 760
    , height = 120
    , colorScale = d3.scaleOrdinal().range(["#BB2233","#7f2c39", "#dd4237","#2B1F28"])

  function chart(selection) {
    selection.each(function(data) {

    var groupHeight = height/10
      , groupWidth = width/3;

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0,1]);

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0,1]);

    var rotateScale = d3.scaleLinear()
        .range([-45, 45])
        .domain([0,1]);

    var x2 = d3.scaleLinear()
        .range([width/2, width - width/4])
        .domain([0,1]);

    var svg = d3.select(this);

    window.windowTimer = d3.interval(function(elapsed) {

      var n = elapsed/400 > 40 ? 50 : elapsed/400;

      svg.selectAll(".triangle-group")
         .data(d3.range(n).map(Object))
       .enter().append("g")
        .attr("class", "triangle-group")
        .attr("transform", "scale(" + d3.randomUniform(1)() + ")")
        .on("mouseenter", function() {

           d3.select(this)
             .selectAll("path")
             .transition()
             .duration(3000)
             .ease(d3.easePoly)
             .delay(function(d, i) { return i*200 })
             .style("stroke",function(d,i) { return colorScale(i); })
             .attr("transform","rotate(" + rotateScale(Math.random())+ ") scale(5) translate(" + (d3.event.pageX/Math.PI) + "," + (d3.event.pageY/Math.PI)  + ")")
             .transition()
             .duration(3000)
             .style("opacity", 0);

            d3.select(this)
              .transition()
              .delay(6000)
              .remove()
        })
        .selectAll(".triangle")
        .data(d3.range(4).map(Object))
       .enter().append("path")
        .attr("class", "triangle")
        .attr("transform", "translate(" + x(Math.random()) + "," + y(d3.randomUniform(1)()) + ")" )
        .attr("d", "M 0 " + (-groupHeight/3) + " L " + (-groupWidth/3) + " " + (groupHeight/3) + "L " + (groupWidth/3) + " " + (groupHeight/3) + " Z")
        .style("fill",function(d,i) { return colorScale(i); })
        .style("stroke",function(d,i) { return colorScale(i); })
       .transition()
       .duration(800)
       .ease(d3.easePoly)
       .delay(function(d, i) { return i*100 })
       .style("stroke",function(d,i) { return colorScale(i); })
       .attr("transform", "translate(" + x2(Math.random()) + "," + y(d3.randomUniform(1)()) + ")")
       .transition()
       .delay(2000)
       .duration(2000)
       .transition()
       .duration(800)
       .ease(d3.easePoly)
       .delay(function(d, i) { return i*100 })
       .style("stroke",function(d,i) { return colorScale(i); })
       .attr("transform", "translate(" + x2(Math.random()) + "," + y(d3.randomUniform(1)()) + ")")

    }, 500);


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