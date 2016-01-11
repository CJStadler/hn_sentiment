var React = require('react'),
    sentiment = require('sentiment'),
    chroma = require('chroma-js'),
    api = require("../api.js");

var chroma_scale = chroma.scale("RdBu").domain([-0.5, 0.5]);

var CommentsSummary = React.createClass({displayName: "CommentsSummary",

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
        var normalized = normalize(comments_mean, n_comments);
        var color = chroma_scale(normalized);
        var style = {
            border: "1px solid gray",
            display: "inline-block",
            height: "1em",
            width: "1em",
            backgroundColor: color
        };
        // return <div>{n_comments},{sum},{mean}</div>;
        return React.createElement("div", null, 
            this.props.story.descendants, " comments", 
            comments_mean, 
            React.createElement("span", {style: style})
        );
    }

});


var normalize = function(score, n_comments) {
    // measured values
    var mean = 0.106;
    var sd = 0.127;

    // when there are more comments the score tends towards the mean, so this minimizes that
    var comments_scale = score * Math.log(n_comments)

    // differences close to the mean should be more apparent than differences far from it
    var from_mean;
    if (score >= mean) {
        from_mean = normalcdf(comments_scale, mean, sd) - 0.5;
    } else {
        from_mean = 0.5 - normalcdf(2*mean - comments_scale, mean, sd);
    }
    return from_mean;
};

// modified from http://stackoverflow.com/a/14873282
function normalcdf(x, mean, sd) {
    return 0.5 * (1 + erf((x - mean) / (Math.sqrt(2 * sd * sd))));
}

function erf(x) {
    // save the sign of x
    var sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    // constants
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var p  =  0.3275911;

    // A&S formula 7.1.26
    var t = 1.0/(1.0 + p*x);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y; // erf(-x) = -erf(x);
}

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
