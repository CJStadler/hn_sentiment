var React = require('react');

var Comment = React.createClass({displayName: "Comment",

    render: function() {
        var comments;
        if (this.props.comment.hasOwnProperty("comments")) {
            comments = this.props.comment.comments.map(function(comment) {
                return React.createElement(Comment, {comment: comment, key: comment.id})
            });
        }
        return React.createElement("div", {className: "comment"}, 
            this.props.comment.by, " -- ", this.props.comment.time, 
            React.createElement("div", {className: "text", dangerouslySetInnerHTML: {__html: this.props.comment.text}}), 
            comments
        );
    }

});

module.exports = Comment;
