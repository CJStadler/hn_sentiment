var React = require('react'),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");

var Comment = React.createClass({displayName: "Comment",

    render: function() {
        var normalized_sentiment,
            comments,
            comment;

        normalized_sentiment = stats.normalize(this.props.comment.sentiment);

        if (this.props.comment.hasOwnProperty("comments")) {
            comments = this.props.comment.comments.map(function(comment) {
                return React.createElement(Comment, {comment: comment, key: comment.id, range: this.props.range})
            }.bind(this));
        }

        if (this.props.comment.sentiment >= this.props.range.min &&
            this.props.comment.sentiment < this.props.range.max) {
            comment = React.createElement("div", null, 
                React.createElement(ColorPatch, {score: normalized_sentiment}), 
                this.props.comment.by, " -- ", this.props.comment.time.toString(), ":", 
                React.createElement("div", {className: "text", dangerouslySetInnerHTML: {__html: this.props.comment.text}})
            )
        }

        return React.createElement("div", {className: "comment", style: comment_styles}, 
            comment, 
            comments
        );
    }

});

var comment_styles = {
    margin: "10px 0 0 20px",
}

module.exports = Comment;
