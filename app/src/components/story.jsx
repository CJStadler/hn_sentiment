var React = require('react'),
    api = require('../api.js'),
    ReactFireMixin = require('reactfire'),
    CommentsSummary = require('./comments_summary.js');


var Story = React.createClass({
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
            return <div>...</div>;
        } else {
            return <div>
                <h2><a href={this.state.story["url"]}>{this.state.story["title"]}</a></h2>
                <CommentsSummary story_id={this.state.story["id"]} />
            </div>;
        }
    }
});

module.exports = Story;
