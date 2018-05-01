$(document).ready(function () {

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var audioElement = document.getElementById('audioElement');
  var audioSrc = audioCtx.createMediaElementSource(audioElement);
  var analyser = audioCtx.createAnalyser();

  // Bind our analyser to the media element source.
  audioSrc.connect(analyser);
  audioSrc.connect(audioCtx.destination);

  var frequencyData = new Uint8Array(analyser.frequencyBinCount);
  // var frequencyData = new Uint8Array(100);

  analyser.getByteTimeDomainData(frequencyData);
  console.log(frequencyData)

  // analyser.fftSize = 2048;
  // var bufferLength = analyser.fftSize;
  // var dataArray = new Uint8Array(bufferLength);
  // analyser.getByteTimeDomainData(dataArray);

  // console.log(frequencyData)


  var margin = {top: 20, right: 10, bottom: 20, left: 10},
      width = (window.innerWidth*1.2) - margin.left - margin.right,
      height = (window.innerHeight*1.1) - margin.top - margin.bottom,
      adjustedHeight = height/5,
      adjustedWidth = width/4,
      barPadding = 1;

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var defs = svg.append("defs");
  
  var filterGoo = defs.append("filter").attr("id","gooeyCodeFilter");

  filterGoo.append("feGaussianBlur")
      .attr("in","SourceGraphic")
      .attr("stdDeviation","5")
      .attr("color-interpolation-filters","sRGB") 
      .attr("result","blur");
  
  filterGoo.append("feColorMatrix")
      .attr("in","blur")
      .attr("mode","matrix")
      .attr("values","1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7")
      .attr("result","gooey");


  var secondScale = d3.scaleLinear()
    .domain([0,60])
    .range([0,360])

  var yScale = d3.scaleLinear()
      .domain([0,350])
      .range([height, 0]);

    var area = d3.area()
        .curve(d3.curveMonotoneX)
      .x(function (d, i) { return i * ((width+40) / frequencyData.length) - 20; })
      .y(function(d) { return yScale(d); })
      .y1(height+50)

  defs.append("pattern")
    .attr("id", "image")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", 1)
    .attr("width", 1)
    .append("image")
    .attr("x", -50)
    .attr("y", 0)
    .attr("height", 200)
    .attr("width", 200)
    .attr("xlink:href", "the_great.jpeg")

  svg.append("circle")
     .attr("class", "logo")
     .attr("cx", 0)
     .attr("cy", height)
     .attr("r", 50)
     .style("fill", "url(#image)")      
     .style("stroke", "black")     
     .style("stroke-width", 0.25);

var numFlakes = 50
  , flakeGroups = 20
  , flakeHeight = height*(4/5)
  , flakeSize = 12

var rects = svg.selectAll(".rect-group")
    .data(d3.range(flakeGroups).map(Object))
  .enter().append("g")
    .attr("class", "rect-group")
    .style("filter", "url(#gooeyCodeFilter)")
    .attr("transform",function(d, i) { return "translate(" + (width * Math.random()) + ",0)" })
    .selectAll(".rect")
    .data(d3.range(numFlakes).map(Object))
  .enter().append("rect")
    .attr("class", "rect")
    .attr("width", flakeSize)
    .attr("height", flakeSize)
    .attr("y", function() { return Math.random() })
    .attr("y", function(d, i) { return i*(flakeHeight/numFlakes) })

  svg.append("path")
      .datum(frequencyData)
      .attr("class", "area")
      .attr("d", area);


var t = d3.interval(function(elapsed) {

 // Copy frequency data to frequencyData array.
 analyser.getByteTimeDomainData(frequencyData);

svg.select(".area")
  .datum(frequencyData)
  .attr("d", area)
  .style("stroke-width", 3);

}, 10)


d3.select(window).on("keydown", function() {
  t.stop()

  d3.selectAll(".rect")
    .transition()
    .delay(function(d,i) { return i*5 })
    .style("opacity", 1)
    .transition()
    .delay(function(d,i) { return i*5 })
    .style("opacity", 0)

 // Copy frequency data to frequencyData array.
 analyser.getByteTimeDomainData(frequencyData);

svg.select(".area")
  .datum(frequencyData)
  .transition()
  .attr("d", area);

  d3.interval(function() {

    d3.selectAll(".rect")
      .transition()
      .delay(function(d,i) { return i*5 })
      .style("opacity", 1)
      .transition()
      .delay(function(d,i) { return i*5 })
      .style("opacity", 0)

  }, 2000);

  d3.interval(function() {
   // Copy frequency data to frequencyData array.
   analyser.getByteTimeDomainData(frequencyData);

  svg.select(".area")
    .datum(frequencyData)
    .transition()
    .attr("d", area);
    
  }, (130/60)*200);

  d3.select(".logo")
    .transition()
    .duration(15000)
    .attr("cx", width/2)
    .attr("cy", 100)
    .transition()
    .duration(15000)
    .attr("transform", "scale(3)")
    .transition()
    .duration(15000)
    .attr("cx", width)
    .attr("cy", height)

})



});