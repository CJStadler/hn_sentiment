var React = require('react'),
    sentiment = require('sentiment'),
    api = require('../libs/api.js'),
    StorySummary = require('../components/story_summary.js'),
    Comment = require('../components/comment.js'),
    Histogram = require('../components/histogram.js');

var Story = React.createClass({displayName: "Story",

    getInitialState: function() {
        return {story: null, sentiments: [], refs: [], range: {min: -100, max: 100}};
    },

    componentWillMount: function() {

        // get story
        api.item(this.props.id, this.refCollector, function(story) {
            story.sentiment = 0;
            this.setState({story: story});

            // nest all comments within the story, and collect the sentiments
            api.all_descendants(story, this.refCollector, function(comment) {
                if (! comment.hasOwnProperty("deleted") || comment.deleted === false) {
                    var s_comp = sentiment(comment.text).comparative;
                    comment.sentiment = s_comp;
                    // update state
                    this.setState(function(previousState, currentProps) {
                        var sentiments = previousState.sentiments.slice();
                        sentiments.push(s_comp);
                        return {
                            sentiments: sentiments
                        };
                    });
                }
            }.bind(this));

        }.bind(this));
    },

    componentWillUnmount: function() {
        this.state.refs.forEach(function(ref) {
            ref.off();
        });
    },

    render: function() {
        var content = "Loading...";
        var comments;
        if (this.state.story !== null) {
            if (! this.props.condensed && this.state.story.hasOwnProperty("comments")) {

                // comments = this.state.story.comments.map(function(comment) {
                //     return <Comment comment={comment} key={comment.id}/>;
                // });
                comments = React.createElement(Comment, {comment: this.state.story, key: this.state.story.id, range: this.state.range});
            }
            content = React.createElement("div", null, 
                React.createElement(StorySummary, {sentiments: this.state.sentiments, story: this.state.story}), 
                React.createElement(Histogram, {id: this.state.story.id, 
                    values: this.state.sentiments, 
                    click_callback: this.toggle_sentiment_range}), 
                comments
            );
        }
        return React.createElement("div", null, 
            content
        );
    },

    toggle_sentiment_range: function(d) {
        var min = d.x;
        var max = d.x + d.dx;
        if (min === -0.5) {
            min = -100;
        } else if (max === 0.5) {
            max = 100;
        }
        this.setState({range: {min: min, max: max}});
    },

    refCollector: function(ref) {
        var refs = this.state.refs.slice();
        refs.push(ref);
        this.setState({refs: refs});
    }
});

module.exports = Story;
