 function lineChart() {

  var margin = {top: 20, right: 20, bottom: 20, left: 20}
    , width = 760
    , height = 120
    , colorScale = d3.scaleSequential(d3.interpolateRainbow)


  function chart(selection) {
    selection.each(function(data) {





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