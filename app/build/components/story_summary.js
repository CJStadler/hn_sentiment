var React = require('react'),
    CommentsSummary = require('./comments_summary.js');


var StorySummary = React.createClass({displayName: "StorySummary",

    render: function() {
        if (this.props.story === null) {
            return React.createElement("div", null, "...");
        } else {
            // return <div><CommentsSummary story={this.props.story} /></div>;
            return React.createElement("div", null, 
                React.createElement("h2", null, React.createElement("a", {href: this.props.story.url}, this.props.story.title)), 
                React.createElement(CommentsSummary, {story: this.props.story})
            );
        }
    }
});

module.exports = StorySummary;
