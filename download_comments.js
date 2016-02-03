var fs = require('fs'),
    api = require("./json_api.js"),
    stringify = require('csv-stringify');

var limit = 100,
    filename = "comments.csv",
    columns = {
        id: 'id',
        by: 'by',
        text: 'text'
    },
    options = {
        header: true,
        columns: columns
    };

//var csv_stream = fs.createWriteStream(filename);

var writeComments = function(comments) {
    stringify(comments, options, function(err, output) {
        if (err) {
            console.log(err);
        }
        fs.writeFile(filename, output, function(err) {
            if (err) {
                console.log(err);
            }
            console.log("csv created");
        });
    });
};

console.log("getting comments of top " + limit + " stories");
api.comments_from_topstories(limit)
    .then(function(comments) {
        console.log(comments.length + " comments found");
        writeComments(comments);
        return comments;
    });

// api.get_item(5).then(function(o) {
//     console.log(o);
// });

// console.log("getting topstories...");
// // collect all comments descending from topstories
// api.topstories(limit, refCollector, function(story_id) {
//     // CALLBACK IS NEVER FIRING
//     console.log("got story: " + story_id);
//     api.all_descendants(story_id, refCollector, writeComment);
// });

// api.item(1, refCollector, function(item) {
//     console.log("got item: " + item);
// });

// turn off all refs
// refs.forEach(function(ref) {
//     ref.off();
// });
