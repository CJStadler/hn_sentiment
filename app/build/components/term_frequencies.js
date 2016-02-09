var React = require('react'),
    d3 = require('d3'),
    keywords = require("../../../lib/keywords.js");

var TermFrequencies = React.createClass({displayName: "TermFrequencies",

    propTypes: {
        loaded: React.PropTypes.bool.isRequired,
        keywords: React.PropTypes.array
    },

    render: function() {
        var displayed_terms = "Loading...";

        // when all comments are loaded find the most important terms and cluster
        if (this.props.loaded) {
            displayed_terms = this.props.keywords.map(function(t) {
                return React.createElement("div", {key: t.term}, t.term + ": " + t.frequency + ", " + t.tfidf);
            });
        }

        return React.createElement("div", null, 
            displayed_terms
        );
    }
});

module.exports = TermFrequencies;
