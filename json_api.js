var req = require('request'),
    Promise = require('bluebird');

var base_url = "https://hacker-news.firebaseio.com/v0/";

var json_req = req.defaults({
    headers: {'User-Agent': 'Request'},
    json: true,
    pool: {maxSockets: 10}
}); // if pool is too large then there are server errors (and high memory usage)

var request = function(url, callback) {
    json_req(url, function (error, response, body) {
        if (!error && response.statusCode == 200 && typeof body !== "undefined" && body !== null) {
            callback(body);
        } else if (error) {
            process.stdout.write(error.code);
        }
    });
};

var topstories = function(limit, callback) {
    var url = base_url + "topstories.json";

    request(url, function(ids) {
        if (limit < ids.length) {
            ids = ids.slice(0, limit);
        }
        callback(ids);
    });
};

var get_item = function(id, callback) {
    var url = base_url + "item/" + id + ".json";
    request(url, callback);
};

// get an item and all it's kids
var all_descendants = function(id, callback) {
    get_item(id, function(item) {
            // apply callback to comment
            if (item.type === "comment") { // what about if deleted?
                callback(item);
            }

            // recurse on descendants
            if (item.hasOwnProperty("kids")) {
                descendants_from_ids(item.kids, callback);
            }
        });
};

var descendants_from_ids = function(ids, callback) {
    ids.forEach(function(id) {
        all_descendants(id, callback);
    });
};

var each_comment_from_topstories = function(limit, callback) {
    topstories(limit, function(ids) {
        descendants_from_ids(ids, callback);
    });
};

module.exports = {
    get_item: get_item,
    topstories: topstories,
    all_descendants: all_descendants,
    each_comment_from_topstories: each_comment_from_topstories
};
