var React = require('react'),
    color_scale = require('../../../lib/color_scale.js');

var ColorPatch = React.createClass({displayName: "ColorPatch",

    propTypes: {
        score: React.PropTypes.number.isRequired
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.score !== this.props.score;
    },

    render: function() {
        var color = color_scale(this.props.score);

        var style = {
            border: "1px solid gray",
            display: "inline-block",
            height: "1em",
            width: "1em",
            margin: "0 0.5em",
            verticalAlign: "bottom",
            backgroundColor: color
        };

        return React.createElement("span", {style: style});
    }

})

module.exports = ColorPatch;
