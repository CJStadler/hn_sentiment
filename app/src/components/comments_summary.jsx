var React = require('react'),
    sentiment = require('sentiment'),
    chroma = require('chroma-js'),
    api = require("../api.js"),
    stats = require("../stats.js");

var chroma_scale = chroma.scale("RdBu").domain([-0.5, 0.5]);

var CommentsSummary = React.createClass({

    getInitialState: function() {
        return {sentiments: []};
    },

    componentWillMount: function() {
        api.all_descendants(this.props.story, function(comment) {

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

    render: function() {
        var comments_sum = 0;
        var comments_mean = 0;
        var n_comments = this.state.sentiments.length;

        if (n_comments > 0) {
            comments_sum = this.state.sentiments.reduce(function(sum, current) {
                return sum + current;
            }, 0);

            comments_mean = comments_sum / this.state.sentiments.length;
        }
        var normalized = stats.normalize(comments_mean, n_comments);
        var color = chroma_scale(normalized);
        var style = {
            border: "1px solid gray",
            display: "inline-block",
            height: "1em",
            width: "1em",
            backgroundColor: color
        };
        // return <div>{n_comments},{sum},{mean}</div>;
        return <div>
            {this.props.story.descendants} comments
            {comments_mean}
            <span style={style}></span>
        </div>;
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
