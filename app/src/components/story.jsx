var React = require('react'),
    Firebase = require('firebase'),
    ReactFireMixin = require('reactfire');


var Story = React.createClass({
    mixins: [ReactFireMixin],

    componentWillMount: function() {
       var ref = new Firebase("https://hacker-news.firebaseio.com/v0/item/" + this.props.hn_id);
       this.bindAsObject(ref, "story");
    },

    render: function() {
        if (this.state === null) {
            return <div>...</div>;
        } else {
            return <div>{this.state.story["title"]}</div>;
        }
    }
});

module.exports = Story;
