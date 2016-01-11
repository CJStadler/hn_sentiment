var React = require('react'),
    IndexLink = require('react-router').IndexLink;

var Story = React.createClass({displayName: "Story",
    render: function() {
        return React.createElement("div", null, 
            React.createElement(IndexLink, {to: "/"}, "Index"), 
            "Hello! ", this.props.params.id
        );
    }
})

module.exports = Story;
