var React = require('react'),
    api = require("../libs/api.js"),
    Story = require('../components/story.js'),
    Pagination = require('../components/pagination.js');

var per_page = 30;

var Index = React.createClass({displayName: "Index",

    getInitialState: function() {
        return {story_ids: [], ref: null, page: 0};
    },

    componentWillMount: function() {
        api.topstories(500, this.refCollector, this.add_story_id);
    },

    refCollector: function(ref) {
        this.setState({ref: ref});
    },

    add_story_id: function(id) {
        var ids = this.state.story_ids.slice();
        ids.push(id);
        this.setState({story_ids: ids});
    },

    componentWillUnmount: function() {
        this.state.ref.off();
    },

    current_page: function() {
        if (typeof this.props.location.query.page === 'undefined') {
            return 0;
        } else {
            return parseInt(this.props.location.query.page);
        }
    },

    render: function() {
        var stories, offset,
            page = this.current_page(),
            pagination = React.createElement(Pagination, {current: page, last: this.last_page()});

        if (this.state.story_ids.length === 0) {
            stories = "Loading...";
        } else {
            offset = page * per_page;
            stories = this.state.story_ids.slice(offset, offset + per_page);
            stories = stories.map(function(id, i) {
                return React.createElement(Story, {index: offset + i + 1, condensed: true, id: id, key: id});
            });
        }

        return React.createElement("div", null, 
            pagination, 
            stories, 
            pagination
        );
    },

    last_page: function() {
        return Math.ceil(this.state.story_ids.length / per_page) - 1;
    }
});

module.exports = Index;
