var React = require('react'),
    Story = require('../components/story.jsx');

var StoryPage = React.createClass({
    render: function() {
        return <Story condensed={false} id={this.props.params.id} />;
    }
})

module.exports = StoryPage;
