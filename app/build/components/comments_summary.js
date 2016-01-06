var React = require('react'),
    api = require('../api.js'),
    ReactFireMixin = require('reactfire');

var CommentsSummary = React.createClass({displayName: "CommentsSummary",mixins: [ReactFireMixin],

    getInitialState: function() {
        return {comment_ids: []};
    },

    componentDidMount: function() {
       var kids = api.kids(this.props.story_id);
       this.bindAsArray(kids, "comment_ids");
    },

    render: function() {
        return React.createElement("div", null, this.state.comment_ids.length, " comments");
    }
});

module.exports = CommentsSummary;
