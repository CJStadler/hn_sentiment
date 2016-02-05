var React = require('react'),
    router = require('react-router'),
    Link = router.Link,
    api = require("../../../libs/firebase_api.js"),
    stats = require("../../../libs/stats.js"),
    ColorPatch = require("./color_patch.js"),
    Timestamp = require("./timestamp.js");


var StorySummary = React.createClass({

    shouldComponentUpdate: function(nextProps) {
        return nextProps.story.id !== this.props.story.id ||
                nextProps.index !== this.props.index ||
                nextProps.sentiments.length !== this.props.sentiments.length;
    },

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
                </a> <Timestamp time={story.time} />
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
