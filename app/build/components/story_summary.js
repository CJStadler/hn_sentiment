var React = require('react'),
    router = require('react-router'),
    Link = router.Link,
    api = require("../libs/api.js"),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");


var StorySummary = React.createClass({displayName: "StorySummary",

    render: function() {
        var normalized_mean = stats.normalized_mean(this.props.sentiments);

        // return <div>{n_comments},{sum},{mean}</div>;
        return React.createElement("div", null, 
            React.createElement("div", null, 
                React.createElement("h2", null, React.createElement("a", {href: this.props.story.url}, this.props.story.title))
            ), 
            React.createElement(Link, {to: "/story/" + this.props.story.id}, 
                this.props.story.descendants, " comments", 
                React.createElement(ColorPatch, {score: normalized_mean})
            )
        );
    }
});

module.exports = StorySummary;
