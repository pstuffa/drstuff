function reset() {
	window.windowTimer.stop();

	d3.selectAll("circle")
		.transition()
		.duration(2000)
		.delay(function(d, i) { return i })
		.attr("transform", "translate(-1000,-1000) scale(.1) rotate(90)")
		.remove();

	d3.selectAll("rect")
		.transition()
		.duration(2000)
		.delay(function(d, i) { return i })
		.attr("transform", "translate(-1000,-1000) scale(.1) rotate(90)")
		.remove();

	d3.selectAll("path")
		.transition()
		.duration(2000)
		.delay(function(d, i) { return i })
		.attr("transform", "translate(-1000,-1000) scale(.1) rotate(90)")
		.remove();

	d3.selectAll("line")
		.transition()
		.duration(2000)
		.delay(function(d, i) { return i })
		.attr("transform", "translate(-1000,-1000) scale(.1) rotate(90)")
		.remove()

	d3.select("svg")
	  .select("g")
	  .selectAll("g")
		.transition()
		.duration(2000)
		.delay(function(d, i) { return i })
		.attr("transform", "translate(-1000,-1000) scale(.1) rotate(90)")
		.remove()
}
