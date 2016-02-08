var React = require('react'),
    d3 = require('d3'),
    tfidf = require("../../../libs/tfidf");

var idfs;

// load corpus
d3.json("/idfs.json", function(error, json) {
    if (error) {
        return console.warn(error);
    } else {
        idfs = json;
    }
});

var TermFrequencies = React.createClass({

    propTypes: {
        story: React.PropTypes.object.isRequired
    },

    render: function() {
        var terms;
        if (typeof idfs === "object") { // is loaded

            var all_comments = get_all_comments(this.props.story);

            // when all comments are loaded find the most important terms
            if (all_comments.length >= this.props.story.descendants) {
                var t0 = performance.now();
                terms = tfidf.get_important_terms(all_comments, idfs).map(function(t) {
                    return <div key={t.term}>{t.term + ": " + t.frequency + ", " + t.tfidf}</div>;
                });
                var t1 = performance.now();
                console.log("time: " + (t1-t0));
            }
        }

        return <div>{terms}</div>;
    }
});

// go through the tree of comments and construct an array with the text of each
var get_all_comments = function(item) {

    var comments = [];

    if (item.hasOwnProperty("comments")) {
        comments = item.comments.map(get_all_comments);
        comments = [].concat.apply([], comments);
    }

    if (item.hasOwnProperty("text")) {
        comments.push(item.text);
    }

    return comments;
}


module.exports = TermFrequencies;
