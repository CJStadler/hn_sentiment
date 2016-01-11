var React = require('react'),
    router = require('react-router'),
    Link = router.Link,
    chroma = require('chroma-js'),
    api = require("../libs/api.js"),
    stats = require("../libs/stats.js");

var chroma_scale = chroma.scale(["#fc8d59", "white", "#91cf60"]).domain([-0.4, stats.neutral_score, 0.4]);

var StorySummary = React.createClass({

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
        return <div>
            <div>
                <h2><a href={this.props.story.url}>{this.props.story.title}</a></h2>
            </div>
            <Link to={"/story/" + this.props.story.id}>
                {this.props.story.descendants} comments
                <span style={style}></span>
            </Link>
        </div>;
    }
});

module.exports = StorySummary;
