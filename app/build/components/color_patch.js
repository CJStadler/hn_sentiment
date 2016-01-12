var React = require('react'),
    chroma = require('chroma-js'),
    stats = require("../libs/stats.js");

var chroma_scale = chroma.scale(["#fc8d59", "white", "#91cf60"]).domain([-0.4, stats.neutral_score, 0.4]);

var ColorPatch = React.createClass({displayName: "ColorPatch",

    render: function() {
        var color = chroma_scale(this.props.score);

        var style = {
            border: "1px solid gray",
            display: "inline-block",
            height: "1em",
            width: "1em",
            backgroundColor: color
        };

        return React.createElement("span", {style: style});
    }

})

module.exports = ColorPatch;
