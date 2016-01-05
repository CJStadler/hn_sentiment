var React = require('react'),
    ReactDOM = require('react-dom'),
    Firebase = require('firebase'),
    ReactFireMixin = require('reactfire'),
    Story = require('./components/story.js');


var App = React.createClass({
    mixins: [ReactFireMixin],

    componentWillMount: function() {
      var ref = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
      this.bindAsArray(ref, "story_ids");
    },

    render: function() {
        var stories;
        if (this.state.story_ids.length === 0) {
            stories = <div>Loading...</div>;
        } else {
            stories = this.state.story_ids.map(function(id_obj) {
                var id = id_obj[".value"];
                return <Story hn_id={id} key={id_obj[".key"]}/>;
            })
        }
        return <div>{stories}</div>
    }
});

ReactDOM.render(<App />, document.getElementById('app'));

module.exports = App;
