var React = require('react'),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");

var Comment = React.createClass({displayName: "Comment",

    getDefaultProps: function() {
        return {closed: null};
    },
    
    getInitialState: function() {
        return {closed: null}; // whether to show the comment will be then depend on the sentiment range
    },

    componentWillReceiveProps: function(new_props) {
        // when the filter changes, reset state
        if (new_props.range.min !== this.props.range.min ||
            new_props.range.max !== this.props.range.max ||
            new_props.closed !== this.props.closed) {
            this.setState({closed: null});
        }
    },

    render: function() {
        var normalized_sentiment,
            comments,
            comment,
            children_closed;

        var closed = this.state.closed;

        if (closed === null) {
            closed = this.props.closed;
            if (closed === null) {
                closed = this.props.comment.deleted || (
                    this.props.comment.sentiment < this.props.range.min ||
                    this.props.comment.sentiment >= this.props.range.max
                );
            }
        }

        if (this.state.closed === null) {
            children_closed = this.props.closed;
        } else {
            children_closed = this.state.closed;
        }

        normalized_sentiment = stats.normalize(this.props.comment.sentiment);

        if (this.props.comment.hasOwnProperty("comments")) {
            comments = this.props.comment.comments.map(function(comment) {
                return React.createElement(Comment, {
                    comment: comment, 
                    key: comment.id, 
                    range: this.props.range, 
                    closed: children_closed});
            }.bind(this));
        }

        if (closed) {
            comment = React.createElement("div", {onClick: this.open, className: "closed"}, "+");
        } else {
            comment = React.createElement("div", {className: "open"}, 
                React.createElement("span", {onClick: this.close}, React.createElement(ColorPatch, {score: normalized_sentiment})), 
                React.createElement("a", {href: "https://news.ycombinator.com/user?id=" + this.props.comment.by}, 
                    this.props.comment.by
                ), 
                " — ", this.props.comment.time.toString(), ":", 
                React.createElement("div", {className: "text", dangerouslySetInnerHTML: {__html: this.props.comment.text}})
            )
        }

        return React.createElement("div", {className: "comment"}, 
            comment, 
            comments
        );
    },

    open: function() {
        this.setState({closed: false});
    },

    close: function() {
        this.setState({closed: true});
    }

});

module.exports = Comment;
