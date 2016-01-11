var React = require('react'),
    CommentsSummary = require('./comments_summary.js');


var StorySummary = React.createClass({

    render: function() {
        if (this.props.story === null) {
            return <div>...</div>;
        } else {
            // return <div><CommentsSummary story={this.props.story} /></div>;
            return <div>
                <h2><a href={this.props.story.url}>{this.props.story.title}</a></h2>
                <CommentsSummary story={this.props.story} />
            </div>;
        }
    }
});

module.exports = StorySummary;
