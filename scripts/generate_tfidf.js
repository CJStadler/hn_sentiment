var natural = require('natural'),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf(),
    csv = require('csv-parser'),
    fs = require('fs');

var comments_filename = "../data/comments.csv";
var idfs_filename = "../public/idfs.json";

// for each row in the csv, add the text to the tfidf
var add_documents_from_csv = function(filename, tfidf, callback) {
    var n = 0;
    fs.createReadStream(filename)
        .pipe(csv())
        .on('data', function(data) {
            n += 1;
            if (n % 500 === 0) console.log(n);
            // add the row to the tfidf
            tfidf.addDocument(data.text);
        })
        .on('end', function() {
            console.log("documents loaded");
            callback(tfidf);
        });
};

// write the dictionary of idfs to a json file
var store_idfs = function(filename, dict) {
    var s = JSON.stringify(dict);

    fs.writeFile(filename, s, function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
};

// Create a dictionary such that for each term in all documents
// {term: idf}
var calculate_idfs = function(tfidf) {
    var idfs = {};
    var n = 0;
    // iterate over documents
    tfidf.documents.forEach(function(document) {
        var term;
        // iterate over terms of document
        for (term in document) {
            if (term !== "__key" && ! idfs.hasOwnProperty(term)) { // idf not already calculated
                // calculate and store idf
                idfs[term] = tfidf.idf(term);
            }
        }
        n += 1;
        if (n % 500 === 0) console.log(n);
    });
    return idfs;
};

console.log("loading comments from csv...");
add_documents_from_csv(comments_filename, tfidf, function(tfidf) {
    // when all rows from the csv have been added
    console.log("calculating idfs...");
    var idfs = calculate_idfs(tfidf);
    console.log("storing idfs...");
    store_idfs(idfs_filename, idfs);
});
