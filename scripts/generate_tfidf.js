var natural = require('natural'),
    TfIdf = natural.TfIdf,
    tfidf = new TfIdf(),
    csv = require('csv-parser'),
    fs = require('fs');

var comments_filename = "../data/comments.csv";
var tfidf_filename = "../public/tfidf.json";

// for each row in the csv, add the text to the tfidf
var add_documents_from_csv = function(filename, tfidf, callback) {
    fs.createReadStream(filename)
        .pipe(csv())
        .on('data', function(data) {
            // read each row of the csv
            tfidf.addDocument(data.text);
        })
        .on('end', function() {
            callback(tfidf);
        });
};

// write a tfidf to a json file
var store_tfidf = function(filename, tfidf) {
    console.log("storing tfidf");
    var s = JSON.stringify(tfidf);

    fs.writeFile(filename, s, function(err) {
        if (err) throw err;
        console.log('It\'s saved!');
    });
};

add_documents_from_csv(comments_filename, tfidf, function(tfidf) {
    // when all rows from the csv have been added
    store_tfidf(tfidf_filename, tfidf);
});
