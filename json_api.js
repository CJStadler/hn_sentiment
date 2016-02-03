var rp = require('request-promise'),
    Promise = require('bluebird');

var base_url = "https://hacker-news.firebaseio.com/v0/";


var request = function(url) {
    var options = {
        uri: url,
        headers: {'User-Agent': 'Request-Promise'},
        json: true
    };

    return rp(options)
        .catch(function(e) {
            process.stdout.write("x");
            return true;
        });
};

var topstories = function(limit) {
    var url = base_url + "topstories.json";

    return request(url).then(function(ids) {
        return ids.slice(0, limit);
    });
};

var get_item = function(id) {
    var url = base_url + "item/" + id + ".json";
    process.stdout.write(".");
    return request(url);
};

// get an item and all it's kids
var all_descendants = function(id) {
    return get_item(id)
        .then(function(item) {
            var items;
            if (item.hasOwnProperty("kids")) {
                items = descendants_from_ids(item.kids)
                    .then(function(items) {
                        if (item.type === "comment") {
                            // need to add item to the array so that it is included
                            items.push(item);
                        }
                        return items;
                    });
            } else {
                items = item;
            }
            return items;
        });
};

var descendants_from_ids = function(ids) {
    descendants = ids.map(function(id) {
        return all_descendants(id);
    });

    return Promise.all(descendants)
        .then(function(descendants) {
            var flattened = [].concat.apply([], descendants);
            return flattened;
        });
};

var comments_from_topstories = function(limit) {
    return topstories(limit)
        .then(function(ids) {
            return descendants_from_ids(ids);
        });
};

module.exports = {
    get_item: get_item,
    topstories: topstories,
    all_descendants: all_descendants,
    comments_from_topstories: comments_from_topstories
};
