var d3 = require('d3'),
    stats = require("./stats.js"),
    color_scale = require('./color_scale.js');

// based on http://bl.ocks.org/mbostock/4063550
var diameter = 800;

var tree = d3.layout.tree()
    .children(function(d) { return d.comments; })
    .size([360, diameter / 2 - 50])
    .separation(function(a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
    });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) {
        return [d.y, d.x / 180 * Math.PI];
    });

var d3_tree = function(container_id) {

    this.svg = d3.select("#" + container_id).append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .append("g")
            .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

};

d3_tree.prototype.render = function(root) {
    var svg = this.svg;

    var nodes = tree.nodes(root);

    var links = tree.links(nodes);

    // Join
    var node = svg.selectAll(".node")
        .data(nodes, function(d) { return d.id; });

    var link = svg.selectAll(".link")
        .data(links, function(d) {
            return d.target.id;
        });

    // Enter
    link.enter().append("path")
        .attr("class", "link");

    node.enter().append("g")
        .attr("class", "node")
        .append("circle")
        .attr("r", 6)
        .attr("fill", function(d) {
            var c;
            if (d.type === "comment") {
                c = color_scale(stats.normalize(d.sentiment)).toString();
            } else {
                c = "steelblue";
            }
            return c;
        })
        .append("title")
        .html(function(d) { return d.text || ""; });

    // Update
    node.attr("transform", function(d) {
        return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
    });

    link.attr("d", diagonal);

};

module.exports = d3_tree;
