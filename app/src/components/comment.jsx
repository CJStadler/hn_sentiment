var React = require('react');

var Comment = React.createClass({

    render: function() {
        var comments;
        if (this.props.comment.hasOwnProperty("comments")) {
            comments = this.props.comment.comments.map(function(comment) {
                return <Comment comment={comment} key={comment.id} />
            });
        }
        return <div className="comment">
            {this.props.comment.by} -- {this.props.comment.time}
            <div className="text" dangerouslySetInnerHTML={{__html: this.props.comment.text}} />
            {comments}
        </div>;
    }

});

module.exports = Comment;
