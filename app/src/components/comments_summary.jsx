var React = require('react'),
    sentiment = require('sentiment'),
    api = require("../api.js");

var CommentsSummary = React.createClass({

    getInitialState: function() {
        return {sentiments: []};
    },

    componentWillMount: function() {
        api.all_descendants(this.props.story, function(comment) {

            if (typeof comment === "undefined") {
                debugger;
            }
            
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
        var sum;
        var mean = 0;
        var n_comments = this.state.sentiments.length;

        if (n_comments > 0) {
            sum = this.state.sentiments.reduce(function(sum, current) {
                return sum + current;
            }, 0);

            mean = sum / this.state.sentiments.length;
        }

        return <div>{this.props.story.descendants} comments {mean}</div>;
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
