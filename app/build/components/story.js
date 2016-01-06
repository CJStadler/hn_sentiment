var React = require('react'),
    CommentsSummary = require('./comments_summary.js');


var Story = React.createClass({displayName: "Story",

    render: function() {
        if (this.props.story === null) {
            return React.createElement("div", null, "...");
        } else {
            return React.createElement("div", null, 
                React.createElement("h2", null, React.createElement("a", {href: this.props.story.url}, this.props.story.title)), 
                React.createElement(CommentsSummary, {story: this.props.story})
            );
        }
    }
});

module.exports = Story;
