var React = require('react'),
    router = require('react-router'),
    Link = router.Link,
    api = require("../libs/api.js"),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");


var StorySummary = React.createClass({

    render: function() {
        var normalized_mean = stats.normalized_mean(this.props.sentiments);
        var story = this.props.story;
        var index = this.props.index;

        if (typeof index !== "undefined") {
            index = <span className="story-index">{index}. </span>
        }

        return <div className="story-summary">
            <div>
                <h2 className="story-title">{index}<a href={story.url}>{story.title}</a></h2>
            </div>
            <div className="subtext">
                {story.score} points |
                by <a href={"https://news.ycombinator.com/user?id=" + story.by}>
                    {story.by}
                </a>
                &nbsp;|&nbsp;
                <Link to={"/story/" + story.id}>
                    {story.descendants} comments
                    <ColorPatch score={normalized_mean} />
                </Link>
            </div>
        </div>;
    }
});

module.exports = StorySummary;
