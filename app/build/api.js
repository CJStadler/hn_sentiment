var Firebase = require('firebase');

var base_url = "https://hacker-news.firebaseio.com/v0/";

var api = {
    base_url: base_url,
    topstories: function(limit, callback) {
        var ref = new Firebase(base_url + "topstories/");
        ref.limitToFirst(limit).on("child_added", function(story_id_obj) {
            var id = story_id_obj.val();
            // get story
            this.item(id, function(item) {
                callback(item);
            });

        }.bind(this));
    },
    item: function(id, callback) {
        var ref = new Firebase(base_url + "item/" + id);

        ref.once("value", function(snapshot) {
            var item = snapshot.val();

            if (item.hasOwnProperty("kids") && item.kids.length > 0) {
                item.kids.forEach(function(id,i) {
                    this.item(id, function(kid) {
                        item.kids[i] = kid;
                    });
                }.bind(this));
            }

            callback(item);

        }.bind(this));
    },
    kids: function(id) {
        return new Firebase(base_url + "item/" + id + "/kids/");
    }
};
module.exports = api;
