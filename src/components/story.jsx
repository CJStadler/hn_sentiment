var React = require('react'),
    d3 = require('d3'),
    sentiment = require('sentiment'),
    api = require('../lib/firebase_api.js'),
    get_keywords = require("../lib/keywords.js").get_keywords,
    clustering = require("../lib/clustering.js"),
    StorySummary = require('../components/story_summary.jsx'),
    Comment = require('../components/comment.jsx'),
    Histogram = require('../components/histogram.jsx'),
    TermFrequencies = require('../components/term_frequencies.jsx'),
    CommentsTree = require('../components/comments_tree.jsx'),
    ClustersSummary = require('../components/clusters_summary.jsx');


var idfs;
// load idfs
d3.json("idfs.json", function(error, json) {
    if (error) {
        return console.warn(error);
    } else {
        idfs = json;
    }
});

var cluster_colors = d3.scale.category10();

var Story = React.createClass({

    getInitialState: function() {
        return {
            story: null,
            comments: [],
            comments_loaded: false,
            refs: [],
            range: {min: -100, max: 100}
        };
    },

    componentWillMount: function() {
        // get story
        api.item(this.props.id, this.refCollector, this.add_story);
    },

    idfs_loaded: function() {
        return typeof idfs === "object";
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

        var comments, comments_tree, term_frequencies, keywords, features, clusters,
            clusters_summary, labeled;
        if (this.state.story !== null) {
            if (! this.props.condensed && this.state.story.hasOwnProperty("comments")) {

                if (this.state.comments_loaded && this.idfs_loaded()) {
                    keywords = get_keywords(this.state.comments, idfs);
                    features = clustering.pick_features(keywords, 10);
                    clusters = clustering.clusters_from_comments(this.state.comments, features);
                    labeled = clustering.label_comments(clusters);

                    clusters_summary = <ClustersSummary
                        features={features}
                        clusters={clusters}
                        colors={cluster_colors} />;

                    comments_tree = <CommentsTree
                        root={this.state.story}
                        colors={cluster_colors} />;
                }

                // term_frequencies = <TermFrequencies
                //     loaded={this.state.comments_loaded}
                //     keywords={keywords} />;


                // comments = <Comment
                //     comment={this.state.story}
                //     key={this.state.story.id}
                //     range={this.state.range} />;
            }

            content = <div>
                <StorySummary index={this.props.index} sentiments={sentiments} story={this.state.story} />
                <Histogram id={this.state.story.id}
                    values={sentiments}
                    click_callback={this.toggle_sentiment_range} />
                {clusters_summary}
                {comments_tree}
                {comments}
            </div>;
        }
        return <div className="story">
            {content}
        </div>;
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
