var React = require('react'),
    router = require('react-router'),
    Link = router.Link,
    api = require("../libs/api.js"),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");


var StorySummary = React.createClass({displayName: "StorySummary",

    render: function() {
        var normalized_mean = stats.normalized_mean(this.props.sentiments);
        var story = this.props.story
        // return <div>{n_comments},{sum},{mean}</div>;
        return React.createElement("div", {className: "story-summary"}, 
            React.createElement("div", null, 
                React.createElement("h2", {className: "story-title"}, React.createElement("a", {href: story.url}, story.title))
            ), 
            React.createElement("div", {className: "subtext"}, 
                story.score, " points |" + ' ' +
                "by ", React.createElement("a", {href: "https://news.ycombinator.com/user?id=" + story.by}, 
                    story.by
                ), 
                " | ", 
                React.createElement(Link, {to: "/story/" + story.id}, 
                    story.descendants, " comments", 
                    React.createElement(ColorPatch, {score: normalized_mean})
                )
            )
        );
    }
});

module.exports = StorySummary;
