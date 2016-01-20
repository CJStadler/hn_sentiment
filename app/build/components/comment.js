var React = require('react'),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");

var Comment = React.createClass({displayName: "Comment",

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
                return React.createElement(Comment, {comment: comment, key: comment.id, range: range})
            }.bind(this));
        }

        if (this.state.opened || (this.props.comment.sentiment >= this.props.range.min &&
            this.props.comment.sentiment < this.props.range.max)) {
            comment = React.createElement("div", {className: "open"}, 
                React.createElement(ColorPatch, {score: normalized_sentiment}), 
                React.createElement("a", {href: "https://news.ycombinator.com/user?id=" + this.props.comment.by}, 
                    this.props.comment.by
                ), 
                " — ", this.props.comment.time.toString(), ":", 
                React.createElement("div", {className: "text", dangerouslySetInnerHTML: {__html: this.props.comment.text}})
            )
        } else {
            comment = React.createElement("div", {onClick: this.open, className: "closed"}, "+");
        }

        return React.createElement("div", {className: "comment"}, 
            comment, 
            comments
        );
    },

    open: function() {
        this.setState({opened: true});
    }

});

module.exports = Comment;
