var fs = require('fs'),
    api = require("../libs/json_api.js"),
    stringify = require('csv-stringify');

var limit = 500,
    filename = "../data/comments.csv",
    headers = ['id', 'by', 'parent', 'time', 'text'];

var csv_stream = fs.createWriteStream(filename);

var write_line = function(columns) {
    stringify([columns], {header: false}, function(err, output) {
            if (err) {
                console.log(err);
            } else {
                csv_stream.write(output);
            }
       });
};

// write headers
write_line(headers);

var write_comment = function(comment) {
    var columns = headers.map(function(h) {
        return comment[h];
    });
    write_line(columns);
};

console.log("getting comments for " + limit + " topstories");
var n = 0;
api.each_comment_from_topstories(limit, function(comment) {
    write_comment(comment);
    process.stdout.write(".");
    n += 1;
    if (n % 100 === 0) {
        process.stdout.write(n + "");
    }
});
