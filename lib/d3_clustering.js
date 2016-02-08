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
    return clusterfck.kmeans(vectors, K);
};

var comments_to_vectors = function(comments, terms) {
    var features = pick_features(terms, 10);

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
            vector.push(f);
        });

        // associate with comment
        vector.comment = comments[i];

        return vector;
    });
};

var pick_features = function(terms, k) {
    return terms.filter(function(term_obj) {
        return term_obj.frequency < 0.5;
    }).slice(0,k).map(function(term_obj) {
        return term_obj.term;
    });
};

module.exports = {
    clusters_from_comments: clusters_from_comments,
    comments_to_vectors: comments_to_vectors
}