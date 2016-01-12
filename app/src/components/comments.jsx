var React = require('react'),
    Comment = require('./comment.js');

var Comments = React.createClass({

    render: function() {
        var comments = this.props.story.comments.map(function(comment) {
            return <Comment comment={comment} />
        })
        return <div>{comments}</div>;
    }

});

module.exports = Comments;
