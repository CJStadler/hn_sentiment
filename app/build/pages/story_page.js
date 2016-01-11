var React = require('react'),
    Story = require('../components/story.js');

var StoryPage = React.createClass({displayName: "StoryPage",
    render: function() {
        return React.createElement(Story, {condensed: false, id: this.props.params.id});
    }
})

module.exports = StoryPage;
