var React = require('react'),
    Firebase = require('firebase'),
    ReactFireMixin = require('reactfire');


var Story = React.createClass({displayName: "Story",
    mixins: [ReactFireMixin],

    componentWillMount: function() {
       var ref = new Firebase("https://hacker-news.firebaseio.com/v0/item/" + this.props.hn_id);
       this.bindAsObject(ref, "story");
    },

    render: function() {
        if (this.state === null) {
            return React.createElement("div", null, "...");
        } else {
            return React.createElement("div", null, this.state.story["title"]);
        }
    }
});

module.exports = Story;
