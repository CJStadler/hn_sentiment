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

var TermFrequencies = React.createClass({displayName: "TermFrequencies",

    propTypes: {
        loaded: React.PropTypes.bool.isRequired,
        comments: React.PropTypes.array.isRequired
    },

    render: function() {
        var frequent_terms, displayed_terms;
        if (typeof idfs === "object") { // is loaded

            // when all comments are loaded find the most important terms and cluster
            if (this.props.loaded) {
                frequent_terms = keywords.get_keywords(this.props.comments, idfs);

                displayed_terms = frequent_terms.slice(0,10).map(function(t) {
                    return React.createElement("div", {key: t.term}, t.term + ": " + t.frequency + ", " + t.tfidf);
                });
            }
        }

        return React.createElement("div", null, 
            displayed_terms
        );
    }
});

module.exports = TermFrequencies;
