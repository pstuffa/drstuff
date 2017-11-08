 function setFase() {

  var margin = {top: 20, right: 20, bottom: 20, left: 20}
    , width = 760
    , height = 120

  function chart(selection) {
    selection.each(function(data) {
      var svg = d3.select(this)

      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "#fff")
        .style("filter", "url(#spect)");

      var i = 0;
      window.windowTimer = d3.interval(function(elapsed) {

          window.turbulence.attr("baseFrequency",i/10000);
          i += 1;
      }, 10);

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