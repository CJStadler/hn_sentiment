var React = require('react'),
    api = require("../libs/api.js"),
    Story = require('../components/story.js');

var Index = React.createClass({

    getInitialState: function() {
        return {story_ids: [], ref: null};
    },

    componentWillMount: function() {

        api.topstories(10, function(ref) {
            this.setState({ref: ref});
        }.bind(this), function(id) {
            var ids = this.state.story_ids.slice();
            ids.push(id);
            this.setState({story_ids: ids});
        }.bind(this));

    },

    componentWillUnmount: function() {
        this.state.ref.off();
    },

    render: function() {
        var stories;
        if (this.state.story_ids.length === 0) {
            stories = "Loading...";
        } else {
            stories = this.state.story_ids.map(function(id) {
                return <Story condensed={true} id={id} key={id}/>;
            })
        }
        return <div>{stories}</div>
    }
});

module.exports = Index;
