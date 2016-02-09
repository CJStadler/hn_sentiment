var React = require('react'),
    sentiment = require('sentiment'),
    api = require('../../../lib/firebase_api.js'),
    StorySummary = require('../components/story_summary.js'),
    Comment = require('../components/comment.js'),
    Histogram = require('../components/histogram.js'),
    TermFrequencies = require('../components/term_frequencies.js'),
    CommentsTree = require('../components/comments_tree.js');

var Story = React.createClass({displayName: "Story",

    getInitialState: function() {
        return {story: null, comments: [], refs: [], range: {min: -100, max: 100}};
    },

    componentWillMount: function() {
        // get story
        api.item(this.props.id, this.refCollector, this.add_story);
    },

    add_story: function(story) {
        story.sentiment = 0;
        this.setState({story: story});

        // nest all comments within the story, and collect the sentiments
        api.all_descendants(story, this.refCollector, this.add_comment);
    },

    add_comment: function(comment) {
        if (! comment.hasOwnProperty("deleted") || comment.deleted === false) {
            var s_comp = sentiment(comment.text).comparative;
            comment.sentiment = s_comp;
            // update state
            this.setState(function(previousState, currentProps) {
                var comments = previousState.comments.slice();
                comments.push(comment);

                var all_loaded = comments.length >= previousState.story.descendants;
                return {
                    comments: comments,
                    comments_loaded: all_loaded
                };
            });
        }
    },

    componentWillUnmount: function() {
        this.state.refs.forEach(function(ref) {
            ref.off();
        });
    },

    render: function() {
        var content = "Loading...";
        var sentiments = this.state.comments.map(function(c) { return c.sentiment; });

        var comments, term_frequencies;
        if (this.state.story !== null) {
            if (! this.props.condensed && this.state.story.hasOwnProperty("comments")) {

                // comments = <Comment
                //     comment={this.state.story}
                //     key={this.state.story.id}
                //     range={this.state.range} />;

                term_frequencies = React.createElement(TermFrequencies, {
                    loaded: this.state.comments_loaded, 
                    comments: this.state.comments});

                comments = React.createElement(CommentsTree, {loaded: this.state.comments_loaded, root: this.state.story});
            }
            content = React.createElement("div", null, 
                React.createElement(StorySummary, {index: this.props.index, sentiments: sentiments, story: this.state.story}), 
                React.createElement(Histogram, {id: this.state.story.id, 
                    values: sentiments, 
                    click_callback: this.toggle_sentiment_range}), 
                term_frequencies, 
                comments
            );
        }
        return React.createElement("div", {className: "story"}, 
            content
        );
    },

    toggle_sentiment_range: function(d) {
        var min = d.x;
        var max = d.x + d.dx;

        // limits at upper and lower bounds should be wider
        if (min === -0.5) {
            min = -100;
        } else if (max === 0.5) {
            max = 100;
        }

        // if it's the same as current, then toggle the range off
        if (min === this.state.range.min && max === this.state.range.max) {
            min = -100;
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
