var React = require('react'),
    router = require('react-router'),
    IndexLink = router.IndexLink;

var Pagination = React.createClass({

    render: function() {
        return <div className="pagination">
            {this.previous_link()}
            {this.page_links()}
            {this.next_link()}
        </div>;
    },

    previous_link: function() {
        if (this.props.current > 0) {
            return <IndexLink to={"/?page=" + (this.props.current - 1)}>Previous</IndexLink>;
        } else {
            return <span>Previous</span>;
        }

    },

    next_link: function() {
        if (this.props.current < this.props.last) {
            return <IndexLink to={"/?page=" + (this.props.current + 1)}>Next</IndexLink>;
        } else {
            return <span>Next</span>;
        }
    },

    page_links: function() {
        // init an array with one element for each page
        var a = Array.apply(0, Array(this.props.last + 1));

        return a.map(function(x,i) {
            if (i !== this.props.current) {
                return <IndexLink to="/" query={{ page: i}} key={i}>{i}</IndexLink>;
            } else {
                return <span key={i}>{i}</span>;
            }
        }.bind(this));

    }
});

module.exports = Pagination;
