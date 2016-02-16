var d3 = require("d3"),
    Tokenizer = require("../node_modules/natural/lib/natural/tokenizers/regexp_tokenizer").WordTokenizer,
    tokenizer = new Tokenizer(),
    keywords = require("./keywords.js"),
    stopwords = keywords.stopwords,
    clusterfck = require("clusterfck");


var clusters_from_comments = function(comments, terms, K) {
    var vectors = comments_to_vectors(comments, terms);
    var clusters = generate_clusters(vectors, K);

    return clusters;
};

var generate_clusters = function(vectors, K) {
    return clusterfck.kmeans(vectors, K, "manhattan");
};

var comments_to_vectors = function(comments, features) {

    var tokenized = comments.map(function(comment) {
        // turn each comment into an array of tokens
        return tokenizer.tokenize(comment.text.toLowerCase());
    });

    var frequencies = tokenized.map(function(comment_tokens) {
        return keywords.get_frequencies(comment_tokens, stopwords);
    });

    // could go from frequencies to tf-idf here

    return frequencies.map(function(comment_frequencies, i) {
        var vector = [];

        features.forEach(function(term) {
            var f = comment_frequencies[term] || 0;
            var presence = (f > 0) ? 1 : 0; // using presence instead of frequency
            vector.push(presence);
        });

        // associate with comment
        vector.comment = comments[i];

        return vector;
    });
};

var pick_features = function(terms, k) {
    return terms.filter(function(term_obj) {
        return term_obj.frequency < 0.8;
    }).slice(0,k).map(function(term_obj) {
        return term_obj.term;
    });
};

// iterate through each comment in a set of clusters, and label it with it's cluster index
var label_comments = function(clusters) {
    clusters.forEach(function(cluster, i) {
        cluster.forEach(function(comment_vector) {
            comment_vector.comment.cluster = i;
        });
    });

    return true;
};

module.exports = {
    pick_features: pick_features,
    clusters_from_comments: clusters_from_comments,
    comments_to_vectors: comments_to_vectors,
    label_comments: label_comments
};
