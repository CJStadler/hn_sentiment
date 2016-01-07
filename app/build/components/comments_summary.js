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

            if (typeof comment === "undefined" || comment === null) {
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
        var sum = 0;
        var score = 0;
        var n_comments = this.state.sentiments.length;

        if (n_comments > 0) {
            sum = this.state.sentiments.reduce(function(sum, current) {
                return sum + current;
            }, 0);

            score = sum / this.state.sentiments.length;
        }
        var normalized = normalize(score, n_comments);
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
            normalized, 
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
        from_mean = normalcdf(mean, sd, comments_scale) - 0.5;
    } else {
        from_mean = 0.5 - normalcdf(mean, sd, 2*mean - comments_scale);
    }
    return from_mean;
};

// http://stackoverflow.com/questions/5259421/cumulative-distribution-function-in-javascript
function normalcdf(mean, sigma, to)
{
    var z = (to-mean)/Math.sqrt(2*sigma*sigma);
    var t = 1/(1+0.3275911*Math.abs(z));
    var a1 =  0.254829592;
    var a2 = -0.284496736;
    var a3 =  1.421413741;
    var a4 = -1.453152027;
    var a5 =  1.061405429;
    var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    var sign = 1;
    if(z < 0)
    {
        sign = -1;
    }
    return (1/2)*(1+sign*erf);
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
