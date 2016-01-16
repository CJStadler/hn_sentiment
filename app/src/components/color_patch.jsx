var React = require('react'),
    color_scale = require('../libs/color_scale.js');

var ColorPatch = React.createClass({

    render: function() {
        var color = color_scale(this.props.score);

        var style = {
            border: "1px solid gray",
            display: "inline-block",
            height: "1em",
            width: "1em",
            backgroundColor: color
        };

        return <span style={style}></span>;
    }

})

module.exports = ColorPatch;
