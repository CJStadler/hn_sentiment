var React = require('react'),
    router = require('react-router'),
    Link = router.Link,
    api = require("../libs/api.js"),
    stats = require("../libs/stats.js"),
    ColorPatch = require("./color_patch.js");


var StorySummary = React.createClass({

    render: function() {
        var normalized_mean = stats.normalized_mean(this.props.sentiments);

        // return <div>{n_comments},{sum},{mean}</div>;
        return <div>
            <div>
                <h2><a href={this.props.story.url}>{this.props.story.title}</a></h2>
            </div>
            <Link to={"/story/" + this.props.story.id}>
                {this.props.story.descendants} comments
                <ColorPatch score={normalized_mean} />
            </Link>
        </div>;
    }
});

module.exports = StorySummary;
