var React = require('react');

var CommentsSummary = React.createClass({

    render: function() {
        var count = this.props.story.descendants;
        // each_item(this.props.comments, function(item) {
        //     count += 1;
        // });
        return <div>{count} comments</div>;
    }

});

var each_item = function(items, callback) {
    items.forEach(function(item) {
        callback(item);
        if (item.hasOwnProperty("kids")) {
            each_item(item.kids, callback);
        }
    })
}

module.exports = CommentsSummary;
