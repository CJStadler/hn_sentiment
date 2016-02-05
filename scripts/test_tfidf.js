var TfIdf = require("../libs/tfidf"),
    fs = require('fs');

var filename = "../public/tfidf.json";

console.log("loading serialized tfidf");
var serialized = fs.readFileSync(filename);

var tfidf = new TfIdf(JSON.parse(serialized));

tfidf.addDocument("test hacker news test computer javascript web");

var i = tfidf.documents.length - 1;
console.log("listing terms for document " + i);

var terms = tfidf.listTerms(i);
console.log(terms);
// terms.forEach(function(item) {
//     console.log(item.term + ': ' + item.tfidf);
// });
