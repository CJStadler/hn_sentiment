// need to include these modules directly because natural can't be browserified
var Tokenizer = require("../node_modules/natural/lib/natural/tokenizers/regexp_tokenizer").WordTokenizer,
    tokenizer = new Tokenizer(),
    stopwords = require("../node_modules/natural/lib/natural/util/stopwords").words;

var custom_stopwords = ["quot", "x2f", "x27", "www", "com", "pre", "gt", "href", "rel", "nofollow"];

stopwords = stopwords.concat(custom_stopwords);

// order terms by the # of comments they appear in
var get_keywords = function(comments, idfs) {
    var n_comments = comments.length;

    // get an array of all terms, but each comment can only contribute 1 of each term
    var all_terms = comments.map(function(comment) {
        // turn each comment into an array of tokens
        var tokens = tokenizer.tokenize(comment.text.toLowerCase());
        return Array.from(new Set(tokens)); // unique
    }).reduce(function(all_terms, comment_terms) {
        // reduce to a single array of all terms
        return all_terms.concat(comment_terms);
    }, []);

    // reduce to a dictionary of {term: frequency}
    var overall_frequencies = get_frequencies(all_terms, stopwords);

    // normalize by idf and # of comments and turn into array
    var terms_with_frequencies = dict_to_array(overall_frequencies, n_comments, idfs);

    terms_with_frequencies.sort(function(a, b) {
        return a.tfidf >= b.tfidf ? -1 : 1;
    });

    return terms_with_frequencies.slice(0,20);
};

var get_frequencies = function(terms, stopwords) {
    return terms.reduce(function(dictionary, term) {
        // based on https://github.com/NaturalNode/natural/blob/master/lib/natural/tfidf/tfidf.js
        if(typeof dictionary[term] === 'function') dictionary[term] = 0;
        if(stopwords.indexOf(term) < 0)
            dictionary[term] = (dictionary[term] ? dictionary[term] + 1 : 1);
        return dictionary;
    }, {});
}

var dict_to_array = function(dict, n_comments, idfs) {
    var array = [];

    var term, frequency, tfidf;
    for (term in dict) {
        frequency = dict[term] / n_comments;
        tfidf = frequency * idfs[term];
        array.push({term: term, frequency: frequency, tfidf: tfidf});
    }

    return array;
};

module.exports = {get_keywords: get_keywords,
    stopwords: stopwords,
    get_frequencies: get_frequencies};
