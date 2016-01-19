var React = require('react'),
    api = require("../libs/api.js"),
    Story = require('../components/story.js'),
    Pagination = require('../components/pagination.js');

var per_page = 10;

var Index = React.createClass({

    getInitialState: function() {
        return {story_ids: [], ref: null, page: 0};
    },

    componentWillMount: function() {

        api.topstories(100, function(ref) {
            this.setState({ref: ref});
        }.bind(this), function(id) {
            var ids = this.state.story_ids.slice();
            ids.push(id);
            this.setState({story_ids: ids});
        }.bind(this));

    },

    componentWillUnmount: function() {
        this.state.ref.off();
    },

    current_page: function() {
        if (typeof this.props.params.page === 'undefined') {
            return 0;
        } else {
            return parseInt(this.props.params.page);
        }
    },

    render: function() {
        var stories, offset,
            page = this.current_page(),
            pagination = <Pagination current={page} last={this.last_page()}/>;

        if (this.state.story_ids.length === 0) {
            stories = "Loading...";
        } else {
            offset = page * per_page;
            stories = this.state.story_ids.slice(offset, offset + per_page);
            stories = stories.map(function(id) {
                return <Story condensed={true} id={id} key={id}/>;
            });
        }

        return <div>
            {pagination}
            {stories}
            {pagination}
        </div>;
    },

    last_page: function() {
        return Math.ceil(this.state.story_ids.length / per_page) - 1;
    }
});

module.exports = Index;
