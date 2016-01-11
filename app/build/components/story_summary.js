var React = require('react'),
    router = require('react-router'),
    Link = router.Link,
    chroma = require('chroma-js'),
    api = require("../libs/api.js"),
    stats = require("../libs/stats.js");

var chroma_scale = chroma.scale(["#fc8d59", "white", "#91cf60"]).domain([-0.4, stats.neutral_score, 0.4]);

var StorySummary = React.createClass({displayName: "StorySummary",

    render: function() {
        var normalized_mean = stats.normalized_mean(this.props.sentiments);
        var color = chroma_scale(normalized_mean);
        var style = {
            border: "1px solid gray",
            display: "inline-block",
            height: "1em",
            width: "1em",
            backgroundColor: color
        };
        // return <div>{n_comments},{sum},{mean}</div>;
        return React.createElement("div", null, 
            React.createElement("div", null, 
                React.createElement("h2", null, React.createElement("a", {href: this.props.story.url}, this.props.story.title))
            ), 
            React.createElement(Link, {to: "/story/" + this.props.story.id}, 
                this.props.story.descendants, " comments", 
                React.createElement("span", {style: style})
            )
        );
    }
});

module.exports = StorySummary;
