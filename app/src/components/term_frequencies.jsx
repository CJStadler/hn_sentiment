var React = require('react'),
    d3 = require('d3'),
    TfIdf = require('../../../node_modules/natural/lib/natural/tfidf/tfidf');

var corpus;

// load corpus
d3.json("/idfs.json", function(error, json) {
    if (error) {
        return console.warn(error);
    } else {
        corpus = json;
    }
});

var TermFrequencies = React.createClass({

    propTypes: {
        story: React.PropTypes.object.isRequired
    },

    render: function() {
        var terms;
        if (typeof corpus === "object") { // is loaded

            var tfidf = new TfIdf(corpus);

            var all_comments = get_all_comments(this.props.story);
            console.log(all_comments.length + " comments found");

            tfidf.addDocument(all_comments.join(" "));

            if (all_comments.length >= this.props.story.descendants) {
                // this is super slow
                var t0 = performance.now();
                var i = tfidf.documents.length - 1; // the one we added is the last document
                terms = tfidf.listTerms(i).slice(0,20).map(function(t) {
                    return <div key={t.term}>{t.term + ": " + t.tfidf}</div>;
                });
                var t1 = performance.now();
                console.log("time: " + (t1 - t0)/1000 + " seconds");
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
