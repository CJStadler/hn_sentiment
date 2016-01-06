var React = require('react'),
    ReactDOM = require('react-dom'),
    api = require("./api.js"),
    ReactFireMixin = require('reactfire'),
    Story = require('./components/story.js');


var App = React.createClass({displayName: "App",

    getInitialState: function() {
        return {stories: []};
    },

    componentWillMount: function() {

        api.topstories(10, function(story) {
            var stories = this.state.stories.slice();
            stories.push(story);
            this.setState({stories: stories});
        }.bind(this));

    },

    componentWillUnmount: function() {
        // do we need to turn off the firebase refs here?
    },

    render: function() {
        var stories;
        if (this.state.stories.length === 0) {
            stories = React.createElement("div", null, "Loading...");
        } else {
            stories = this.state.stories.map(function(story) {
                return React.createElement(Story, {story: story, key: story.id});
            })
        }
        return React.createElement("div", null, stories)
    }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

module.exports = App;
