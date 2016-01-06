var Firebase = require('firebase');

var base_url = "https://hacker-news.firebaseio.com/v0/";

var api = {
    root_ref: new Firebase(base_url),
    topstories: function(limit, callback) {
        var ref = this.root_ref.child("topstories");
        ref.limitToFirst(limit).on("child_added", function(story_id_obj) {
            var id = story_id_obj.val();
            // get story
            this.item(id, function(item) {
                callback(item);
            });

        }.bind(this));
    },
    item: function(id, callback) {
        var ref = this.root_ref.child("item/" + id);

        ref.once("value", function(snapshot) {
            var item = snapshot.val();

            // if (item.hasOwnProperty("kids") && item.kids.length > 0) {
            //     item.kids.forEach(function(id,i) {
            //         this.item(id, function(kid) {
            //             item.kids[i] = kid;
            //             //descendant_callback(kid)
            //         });
            //     }.bind(this));
            // }

            callback(item);

        }.bind(this));
    },
    all_descendants: function(parent, callback) {
        var ref = this.root_ref.child("item/" + parent.id).child("kids");

        ref.on("child_added", function(id_obj) {
            var id = id_obj.val();
            // get object corresponding to id
            this.item(id, function(item) {

                callback(item);

                // add item to parent comments
                if (! parent.hasOwnProperty("comments")) {
                    parent.comments = [];
                }
                parent.comments.push(item);

                // recurse on item descendants
                this.all_descendants(item, callback);

            }.bind(this));
        }.bind(this));
    }
};
module.exports = api;
