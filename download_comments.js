var fs = require('fs'),
    api = require("./json_api.js"),
    stringify = require('csv-stringify');

var limit = 50,
    filename = "comments.csv";

var headers = ['id', 'by', 'text'];

var csv_stream = fs.createWriteStream(filename);

var write_comment = function(comment) {
    var columns = headers.map(function(h) {
        return comment[h];
    });
    stringify([columns], {header: false}, function(err, output) {
            if (err) {
                console.log(err);
            } else {
                csv_stream.write(output);
            }
       });
};

var n = 0;
api.each_comment_from_topstories(limit, function(comment) {
    write_comment(comment);
    process.stdout.write(".");
    n += 1;
    if (n % 50 === 0) {
        process.stdout.write(n + "");
    }
});

// var writeComments = function(comments) {
//     stringify(comments, options, function(err, output) {
//         if (err) {
//             console.log(err);
//         }
//         fs.writeFile(filename, output, function(err) {
//             if (err) {
//                 console.log(err);
//             }
//             console.log("csv created");
//         });
//     });
// };

// console.log("getting comments of top " + limit + " stories");
// api.comments_from_topstories(limit)
//     .then(function(comments) {
//         console.log(comments.length + " comments found");
//         writeComments(comments);
//         return comments;
//     });

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
