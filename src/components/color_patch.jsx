var React = require('react'),
    color_scale = require('../lib/color_scale.js');

var ColorPatch = React.createClass({

    propTypes: {
        color: React.PropTypes.string,
        score: React.PropTypes.number
    },

    render: function() {
        color = this.props.color;
        
        if (this.props.score) {
            color = color_scale(this.props.score);
        }

        var style = {
            border: "1px solid gray",
            display: "inline-block",
            height: "1em",
            width: "1em",
            margin: "0 0.5em",
            verticalAlign: "bottom",
            backgroundColor: color
        };

        return <span style={style}></span>;
    }

})

module.exports = ColorPatch;
