// adapted from http://bl.ocks.org/mbostock/3048450
var d3 = require('d3');

// A formatter for counts.
var formatCount = d3.format(",.0f");

var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .domain([-0.5, 0.5])
    .range([0, width]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var new_chart = function(container_id, sentiments) {

    var svg = d3.select("#" + container_id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var render = function(sentiments) {
        // Generate a histogram using twenty uniformly-spaced bins.
        // if (sentiments.length > 0) {
        //     debugger;
        // }

        var data = d3.layout.histogram()
            .bins(x.ticks(10))
            (sentiments);

        var y = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return d.y; })])
            .range([height, 0]);

        // JOIN
        var bar = svg.selectAll(".bar")
            .data(data);

        // UPDATE
        bar.select("rect")
            .attr("height", function(d) { return height - y(d.y); })
            .attr("transform", function(d) {
                return "translate(" + x(d.x) + "," + y(d.y) + ")";
            })
            .select("text")
                .text(function(d) { return formatCount(d.y); });

        // ENTER
        var enter = bar.enter()
            .append("g")
                .attr("class", "bar")
            .append("rect")
                .attr("x", 1)
                .attr("width", x(data[0].dx - 0.5) - 1)
                .attr("height", function(d) { return height - y(d.y); })
                .attr("transform", function(d) {
                    return "translate(" + x(d.x) + "," + y(d.y) + ")";
                })
            .append("text")
                .attr("dy", ".75em")
                .attr("y", 6)
                .attr("x", x(data[0].dx) / 2)
                .attr("text-anchor", "middle")
                .text(function(d) { return formatCount(d.y); });

        bar.exit().remove();
    };

    return {
        svg: svg,
        render: render
    };
};

module.exports = {new_chart: new_chart};
