var React = require('react'),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");

var Comment = React.createClass({

    render: function() {
        var normalized_sentiment,
            comments,
            comment;

        normalized_sentiment = stats.normalize(this.props.comment.sentiment);

        if (this.props.comment.hasOwnProperty("comments")) {
            comments = this.props.comment.comments.map(function(comment) {
                return <Comment comment={comment} key={comment.id} range={this.props.range}/>
            }.bind(this));
        }

        if (this.props.comment.sentiment >= this.props.range.min &&
            this.props.comment.sentiment < this.props.range.max) {
            comment = <div>
                <ColorPatch score={normalized_sentiment} />
                <a href={"https://news.ycombinator.com/user?id=" + this.props.comment.by}>
                    {this.props.comment.by}
                </a>
                &nbsp;&mdash; {this.props.comment.time.toString()}:
                <div className="text" dangerouslySetInnerHTML={{__html: this.props.comment.text}} />
            </div>
        }

        return <div className="comment" style={comment_styles}>
            {comment}
            {comments}
        </div>;
    }

});

var comment_styles = {
    margin: "10px 0 0 20px",
}

module.exports = Comment;
