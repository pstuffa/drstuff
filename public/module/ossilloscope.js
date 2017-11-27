 function setOssilloscope() {

  var margin = {top: 20, right: 20, bottom: 20, left: 20}
    , width = 760
    , height = 120
    , colorScale = d3.scaleSequential(d3.interpolateRainbow)
    , numTicks = 10
    , numDashes = 5
    , numDots = 10
    , tickSpace = 8;

  function chart(selection) {
    selection.each(function(data) {

    window.turbulence.attr("baseFrequency",".4");

    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([-1,1])

    var x = d3.scaleLinear()
        .range([0, width])
        .domain([-1,1])

    var defs = svg.append("defs");

    var backgroundnoise = svg.append("rect")
        .attr("filter","url(#spect)")
        .style("opacity", .2)
        .attr("width", width)
        .attr("height", height);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).tickSize(-height).ticks(numTicks))
          .selectAll("line")
          .style("stroke-dasharray", function(d,i) { 
              var dashArray = []
              for (var k = 0; k < numTicks; k += 1) {
                  dashArray.push((height/numTicks - (tickSpace/2) - (k > 0 ? (tickSpace/2) : 0)));
                  dashArray.push(tickSpace)
              }      
              return dashArray.join(",") })

      svg.append("g")
          .attr("class", "y axis")
          .call(d3.axisLeft(y).tickSize(-width).ticks(numTicks))
          .selectAll("line")
          .style("stroke-dasharray", function(d,i) { 
              var dashArray = []
              for (var k = 0; k < numTicks; k += 1) {
                  dashArray.push((width/numTicks - (tickSpace/2) - (k > 0 ? (tickSpace/2) : 0)));
                  dashArray.push(tickSpace)
              }         
              return dashArray.join(",") })

       svg.selectAll(".verticalDashes")
          .data(d3.range(numTicks*numDashes).map(Object))
        .enter().append("line")
          .attr("class", "verticalDashes")
          .attr("y1", function(d, i) { return i*(height/numTicks/numDashes); } )
          .attr("y2", function(d, i) { return i*(height/numTicks/numDashes); } )
          .attr("x1", x(-.025))
          .attr("x2", x(.025))
          .style("stroke", "#000")
          .style("stroke-dasharray", function() {
              var unit = x(.025) - x(0);
              return (unit - (tickSpace/4)) + "," + (tickSpace/2) + "," + (unit - (tickSpace/4))
          })

       svg.selectAll(".horizontalDashes")
          .data(d3.range(numTicks*numDashes).map(Object))
        .enter().append("line")
          .attr("class", "horizontalDashes")
          .attr("x1", function(d, i) { return i*(width/numTicks/numDashes); } )
          .attr("x2", function(d, i) { return i*(width/numTicks/numDashes); } )
          .attr("y1", y(-.025))
          .attr("y2", y(.025))
          .style("stroke", "#000")
          .style("stroke-dasharray", function() {
              var unit = x(.025) - x(0);
              return (unit - (tickSpace/4)) + "," + (tickSpace/2) + "," + (unit - (tickSpace/4))
          })

       svg.selectAll(".rowOne dots")
          .data(d3.range(numTicks*numDots).map(Object))
        .enter().append("circle")
          .attr("class", "rowOne dots")
          .attr("cx", function(d, i) { return i*(width/numTicks/numDots); } )
          .attr("cy", function(d, i) { return i % 2 == 0 ? y(.28) : y(-.28) })
          .attr("r", 1)
          .style("fill", "#53535f");

       svg.selectAll(".rowTwo")
          .data(d3.range(numTicks*numDots).map(Object))
        .enter().append("circle")
          .attr("class", "rowTwo dots")
          .attr("cx", function(d, i) { return i*(width/numTicks/numDots); } )
          .attr("cy", function(d, i) { return i % 2 == 0 ? y(.44) : y(-.44) })
          .attr("r", 1)
          .style("fill", "#53535f");

       svg.append("clipPath")
          .attr("id", "clip")
        .append("rect")
          .attr("width", width)
          .attr("height", height);

      var line = d3.line()
          .curve(d3.curveCardinal)
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });

      var data = []

      svg.append("path")
          .datum(data)
          .attr("class", "line")
          .style("stroke", "#22ffc5")
          .style("stroke-width", 2)
          .style("fill", "none")
          .attr("clip-path", "url(#clip)")
          .attr("d", line)
              .style("stroke-width", 10)
          .style("filter", "url(#gooeyCodeFilter)");

      var dividor = 100;
      var i = 0;
      window.windowTimer = d3.interval(function(elapsed) {

          i += 1
          data.push({x: Math.sin(i), y: Math.tan(i) });

          svg.select(".line")
              .datum(data)
              .transition()
              .attr("d", line)

      }, 100);

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