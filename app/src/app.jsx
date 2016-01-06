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
        var stories = [];
        this.firebaseRef = api.topstories(10, function(story) {
            stories.push(story);
        });

        this.setState({
            stories: stories
        });
    //   var ref = api.topstories.limitToFirst(10);
    //   this.bindAsArray(ref, "story_ids");
    },

    componentWillUnmount: function() {
        this.firebaseRef.off();
    },

    render: function() {
        var stories;
        // if (this.state.story_ids.length === 0) {
        //     stories = <div>Loading...</div>;
        // } else {
        //     stories = this.state.story_ids.map(function(id_obj) {
        //         var id = id_obj[".value"];
        //         return <Story hn_id={id} key={id_obj[".key"]}/>;
        //     })
        // }
        // return <div>{stories}</div>
        return <div></div>;
    }
});

ReactDOM.render(<App />, document.getElementById('app'));

module.exports = App;
