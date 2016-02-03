var req = require('request'),
    Promise = require('bluebird');

var base_url = "https://hacker-news.firebaseio.com/v0/";


var request = function(url, callback) {
    var options = {
        uri: url,
        headers: {'User-Agent': 'Request'},
        json: true
    };

    return req(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    });
};

var topstories = function(limit, callback) {
    var url = base_url + "topstories.json";

    request(url, function(ids) {
        callback(ids.slice(0, limit));
    });
};

var get_item = function(id, callback) {
    var url = base_url + "item/" + id + ".json";
    request(url, callback);
};

// get an item and all it's kids
var all_descendants = function(id, callback) {
    get_item(id, function(item) {
            // apply callback to item
            callback(item);

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
