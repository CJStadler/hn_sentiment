var React = require('react'),
    ReactDOM = require('react-dom'),
    api = require("./api.js"),
    ReactFireMixin = require('reactfire'),
    Story = require('./components/story.js');


var App = React.createClass({

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
            stories = <div>Loading...</div>;
        } else {
            stories = this.state.stories.map(function(story) {
                return <Story story={story} key={story.id}/>;
            })
        }
        return <div>{stories}</div>
    }
});

ReactDOM.render(<App />, document.getElementById('app'));

module.exports = App;
