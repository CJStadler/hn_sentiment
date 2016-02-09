var React = require('react'),
    d3 = require('d3'),
    keywords = require("../../../lib/keywords.js");

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
        var frequent_terms, displayed_terms;
        if (typeof idfs === "object") { // is loaded

            var all_comments = get_all_comments(this.props.story);

            // when all comments are loaded find the most important terms and cluster
            if (all_comments.length >= this.props.story.descendants) {
                frequent_terms = keywords.get_keywords(all_comments, idfs)

                displayed_terms = frequent_terms.slice(0,10).map(function(t) {
                    return <div key={t.term}>{t.term + ": " + t.frequency + ", " + t.tfidf}</div>;
                });

            }
        }

        return <div>
            {displayed_terms}
        </div>;
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
        comments.push(item);
    }

    return comments;
}


module.exports = TermFrequencies;
