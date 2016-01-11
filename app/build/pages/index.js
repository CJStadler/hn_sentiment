var React = require('react'),
    api = require("../libs/api.js"),
    StorySummary = require('../components/story_summary.js');

var Index = React.createClass({displayName: "Index",

    getInitialState: function() {
        return {stories: [], refs: []};
    },

    componentWillMount: function() {

        api.topstories(5, function(ref) {
            var refs = this.state.refs.slice();
            refs.push(ref);
            this.setState({refs: refs});
        }.bind(this), function(story) {
            var stories = this.state.stories.slice();
            stories.push(story);
            this.setState({stories: stories});
        }.bind(this));

    },

    componentWillUnmount: function() {
        this.state.refs.forEach(function(ref) {
            ref.off();
        });
    },

    render: function() {
        var stories;
        if (this.state.stories.length === 0) {
            stories = React.createElement("div", null, "Loading...");
        } else {
            stories = this.state.stories.map(function(story) {
                return React.createElement(StorySummary, {story: story, key: story.id});
            })
        }
        return React.createElement("div", null, stories)
    }
});

module.exports = Index;
