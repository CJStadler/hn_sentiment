// need to include these modules directly because natural can't be browserified
var TfIdf = require("../node_modules/natural/lib/natural/tfidf/tfidf"),
    Tokenizer = require("../node_modules/natural/lib/natural/tokenizers/regexp_tokenizer").WordTokenizer,
    tokenizer = new Tokenizer(),
    stopwords = require("../node_modules/natural/lib/natural/util/stopwords").words;

var get_important_terms = function(comments, idfs) {
    var n_comments = comments.length;

    // turn each comment into a dictionary of {term: idf}
    var comments_idfs = comments
        .map(frequencies_from_comment)
        .map(function(frequencies) {
            return tfidfs_from_frequencies(frequencies, idfs);
        });

    // reduce the dictionaries for each comment into a single dictionary, summing the idfs
    var overall_tfidfs = comments_idfs.reduce(sum_tfidfs, {});

    // divide each idf by the number of comments if we want mean instead of sum
    // var term_tfidf;
    // var term;
    // for (term in overall_tfidfs) {
    //     term_tfidf = overall_idfs[term]
    //     term_tfidf = term_tfidf/n_comments
    // }

    terms = dict_to_array(overall_tfidfs);

    terms.sort(function(a, b) {
        return a.tfidf >= b.tfidf ? -1 : 1;
    });

    return terms.slice(0,20);
};

// based on https://github.com/NaturalNode/natural/blob/master/lib/natural/tfidf/tfidf.js
var frequencies_from_comment = function(comment_text) {
    var tokens = tokenizer.tokenize(comment_text.toLowerCase());

    return tokens.reduce(function(document, term) {
        if(typeof document[term] === 'function') document[term] = 0;
        if(stopwords.indexOf(term) < 0)
            document[term] = (document[term] ? document[term] + 1 : 1);
        return document;
    }, {});
};

var tfidfs_from_frequencies = function(frequencies, idfs) {
    var term;
    for (term in frequencies) {
        // based on https://github.com/NaturalNode/natural/blob/master/lib/natural/tfidf/tfidf.js
        var idf = idfs[term];
        if (idf === Infinity || typeof idf === "undefined") {
            idf = 0;
        }
        frequencies[term] = frequencies[term] * idf;
    }
    return frequencies; // but now they are tfidfs
};

var sum_tfidfs = function(sums, comment_tfidfs) {
    var term;
    for (term in comment_tfidfs) {
        if (sums.hasOwnProperty(term)) {
            sums[term] = sums[term] + comment_tfidfs[term];
        } else {
            sums[term] = comment_tfidfs[term];
        }
    }

    return sums;
};

var dict_to_array = function(dict) {
    var array = [];

    var term;
    for (term in dict) {
        array.push({term: term, tfidf: dict[term]});
    }

    return array;
};

module.exports = {get_important_terms: get_important_terms};
