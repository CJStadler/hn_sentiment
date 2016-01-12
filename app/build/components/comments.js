var React = require('react'),
    Comment = require('./comment.js');

var Comments = React.createClass({displayName: "Comments",

    render: function() {
        var comments = this.props.story.comments.map(function(comment) {
            return React.createElement(Comment, {comment: comment})
        })
        return React.createElement("div", null, comments);
    }

});

module.exports = Comments;
