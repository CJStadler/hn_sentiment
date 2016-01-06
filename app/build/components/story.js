var React = require('react'),
    api = require('../api.js'),
    ReactFireMixin = require('reactfire'),
    CommentsSummary = require('./comments_summary.js');


var Story = React.createClass({displayName: "Story",
    mixins: [ReactFireMixin],

    getInitialState: function() {
        return {story: {}};
    },

    componentWillMount: function() {
       var story = api.item(this.props.hn_id);
       this.bindAsObject(story, "story");
    },

    render: function() {
        if (this.state === null) {
            return React.createElement("div", null, "...");
        } else {
            return React.createElement("div", null, 
                React.createElement("h2", null, React.createElement("a", {href: this.state.story["url"]}, this.state.story["title"])), 
                React.createElement(CommentsSummary, {story_id: this.state.story["id"]})
            );
        }
    }
});

module.exports = Story;
