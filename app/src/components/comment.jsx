var React = require('react'),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");

var Comment = React.createClass({

    getInitialState: function() {
        return {opened: false};
    },

    componentWillReceiveProps: function(new_props) {
        if (new_props.range.min !== this.props.range.min || new_props.range.max !== this.props.range.max) {
            this.setState({opened: false});
        }
    },

    render: function() {
        var normalized_sentiment,
            comments,
            comment,
            range;

        normalized_sentiment = stats.normalize(this.props.comment.sentiment);

        if (this.props.comment.hasOwnProperty("comments")) {
            if (this.state.opened) { // All child comments should also be open
                range = {min: -100, max: 100};
            } else {
                range = this.props.range;
            }
            comments = this.props.comment.comments.map(function(comment) {
                return <Comment comment={comment} key={comment.id} range={range}/>
            }.bind(this));
        }

        if (this.state.opened || (this.props.comment.sentiment >= this.props.range.min &&
            this.props.comment.sentiment < this.props.range.max)) {
            comment = <div className="open">
                <ColorPatch score={normalized_sentiment} />
                <a href={"https://news.ycombinator.com/user?id=" + this.props.comment.by}>
                    {this.props.comment.by}
                </a>
                &nbsp;&mdash; {this.props.comment.time.toString()}:
                <div className="text" dangerouslySetInnerHTML={{__html: this.props.comment.text}} />
            </div>
        } else {
            comment = <div onClick={this.open} className="closed">+</div>;
        }

        return <div className="comment">
            {comment}
            {comments}
        </div>;
    },

    open: function() {
        this.setState({opened: true});
    }

});

module.exports = Comment;
