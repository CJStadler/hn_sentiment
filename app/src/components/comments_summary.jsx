var React = require('react'),
    sentiment = require('sentiment'),
    router = require('react-router'),
    Link = router.Link,
    chroma = require('chroma-js'),
    api = require("../libs/api.js"),
    stats = require("../libs/stats.js");

var chroma_scale = chroma.scale("RdBu").domain([-0.5, 0.5]);

var CommentsSummary = React.createClass({

    getInitialState: function() {
        return {sentiments: [], refs: []};
    },

    componentWillMount: function() {
        api.all_descendants(this.props.story, function(ref) {
            var refs = this.state.refs.slice();
            refs.push(ref);
            this.setState({refs: refs});
        }.bind(this), function(comment) {

            if (! comment.hasOwnProperty("deleted") || comment.deleted === false) {
                var s_comp = sentiment(comment.text).comparative;
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
    },

    componentWillUnmount: function() {
        this.state.refs.forEach(function(ref) {
            ref.off();
        });
    },

    render: function() {
        var normalized_mean = stats.normalized_mean(this.state.sentiments);
        var color = chroma_scale(normalized_mean);
        var style = {
            border: "1px solid gray",
            display: "inline-block",
            height: "1em",
            width: "1em",
            backgroundColor: color
        };
        // return <div>{n_comments},{sum},{mean}</div>;
        return <Link to={"/story/" + this.props.story.id}>
            {this.props.story.descendants} comments
            <span style={style}></span>
        </Link>;
    }

});

// var each_comment = function(item, callback) {
//     if (typeof item !== 'undefined' && item !== null) {
//         callback(item);
//         if (item.hasOwnProperty("comments")) {
//             item.comments.forEach(function(comment) {
//                 each_comment(comment, callback);
//             });
//         }
//     }
// }

module.exports = CommentsSummary;
