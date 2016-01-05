var React = require('react'),
    ReactDOM = require('react-dom'),
    Firebase = require('firebase'),
    ReactFireMixin = require('reactfire'),
    Story = require('./components/story.js');


var App = React.createClass({displayName: "App",
    mixins: [ReactFireMixin],

    componentWillMount: function() {
      var ref = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
      this.bindAsArray(ref, "story_ids");
    },

    render: function() {
        var stories;
        if (this.state.story_ids.length === 0) {
            stories = React.createElement("div", null, "Loading...");
        } else {
            stories = this.state.story_ids.map(function(id_obj) {
                var id = id_obj[".value"];
                return React.createElement(Story, {hn_id: id, key: id_obj[".key"]});
            })
        }
        return React.createElement("div", null, stories)
    }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

module.exports = App;
