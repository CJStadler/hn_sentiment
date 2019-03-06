var React = require('react'),
    d3 = require('d3'),
    keywords = require("../lib/keywords.js");

var TermFrequencies = React.createClass({

    propTypes: {
        loaded: React.PropTypes.bool.isRequired,
        keywords: React.PropTypes.array
    },

    render: function() {
        var displayed_terms = "Loading...";

        // when all comments are loaded find the most important terms and cluster
        if (this.props.loaded) {
            displayed_terms = this.props.keywords.map(function(t) {
                return <div key={t.term}>{t.term + ": " + t.frequency + ", " + t.tfidf}</div>;
            });
        }

        return <div>
            {displayed_terms}
        </div>;
    }
});

module.exports = TermFrequencies;
