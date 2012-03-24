var smallRadius = 5,
	largeRadius = 18,
	maxDistance = 50;

// Map distances from center to radius size
// The closer to center, the larger the swell
var radius = d3.scale.linear()
	.domain([maxDistance,0])
	.range([smallRadius,largeRadius]);

// The dots we will show
var dots = [
	{ x:20, y:20, r:smallRadius },
	{ x:50, y:20, r:smallRadius },
	{ x:80, y:20, r:smallRadius },
	{ x:110, y:20, r:smallRadius },
	{ x:140, y:20, r:smallRadius },
	{ x:170, y:20, r:smallRadius },
	{ x:200, y:20, r:smallRadius }
];

// Set up the svg area and the group
var canvas = d3.select("body").append("svg:svg")
	.attr("width", 500)
	.attr("height", 500);
	
canvas.append("svg:g");
	//.attr("transform", "translate(0.5)");

// Set up to have the mouse movements tracked
canvas.on("mousemove", doSwell);

// Show the dots in the base position
canvas.selectAll("circle").data(dots).enter()
	.append("svg:circle")
	.attr("cx", function(x) { return x.x; })
	.attr("cy", function(x) { return x.y; })
	.attr("r", function(x) { return x.r; });
	
// mousemove callback
function doSwell() {
	var p = d3.svg.mouse(this);
	canvas.selectAll("circle")
		.attr("r", function(x) { return calculateRadius(p, x); });
}

// Calculate the distance from the mouse to the center of the dot
// return a radius to reflect how close the mouse is to the center
function calculateRadius(p, x) {
	var a = x.x - p[0]
		b = x.y - p[1];
	var dist = Math.sqrt(a*a + b*b);
	if (dist > maxDistance) return smallRadius;
	return radius(dist);
}
