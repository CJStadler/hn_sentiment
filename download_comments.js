var fs = require('fs'),
    api = require("./app/build/libs/api"),
    stringify = require('csv-stringify');

var limit = 5,
    filename = "comments.csv",
    columns = {
        id: 'id',
        by: 'by',
        text: 'text'
    };

var refs = [];

var refCollector = function(ref) {
    refs.push(ref);
};

var csv_stream = fs.createWriteStream(filename);
var stringifier = stringify({ header: true, columns: columns });

var writeComment = function(comment) {
    comment.write(stringifier).pipe(csv_stream);
};

// collect all comments descending from topstories
api.topstories(limit, refCollector, function(story_id) {
    console.log(story_id);
    api.all_descendants(story_id, refCollector, writeComment);
});

// turn off all refs
refs.forEach(function(ref) {
    ref.off();
});
