var React = require('react');

var Story = React.createClass({displayName: "Story",
    render: function() {
        return React.createElement("div", null, "Hello!");
    }
})

module.exports = Story;
