var Firebase = require('firebase');

var base_url = "https://hacker-news.firebaseio.com/v0/";

var api = {
    root_ref: new Firebase(base_url),
    topstories: function(limit, refCollector, callback) {
        var ref = this.root_ref.child("topstories");
        refCollector(ref);

        ref.limitToFirst(limit).on("child_added", function(story_id_obj) {
            var id = story_id_obj.val();
            callback(id);
        });
    },

    item: function(id, refCollector, callback) {
        var ref = this.root_ref.child("item/" + id);
        refCollector(ref);

        ref.once("value", function(snapshot) {
            var item = snapshot.val();

            if (typeof item !== "undefined" && item !== null) {
                item.time = new Date(item.time);
                callback(item);
            } else {
                console.log("item with id " + snapshot.key() + " not found");
            }

        }.bind(this));
    },

    all_descendants: function(parent, refCollector, callback) {
        var ref = this.root_ref.child("item/" + parent.id).child("kids");
        refCollector(ref);

        ref.on("child_added", function(id_obj) {
            var id = id_obj.val();
            // get object corresponding to id
            this.item(id, refCollector, function(item) {

                callback(item);

                // add item to parent comments
                if (! parent.hasOwnProperty("comments")) {
                    parent.comments = [];
                }
                parent.comments.push(item);

                // recurse on item descendants
                this.all_descendants(item, refCollector, callback);

            }.bind(this));
        }.bind(this));
    }
};
module.exports = api;
