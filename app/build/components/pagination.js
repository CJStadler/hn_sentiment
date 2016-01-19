var React = require('react'),
    router = require('react-router'),
    IndexLink = router.IndexLink;

var Pagination = React.createClass({displayName: "Pagination",

    render: function() {
        return React.createElement("div", {className: "pagination"}, 
            this.previous_link(), 
            this.page_links(), 
            this.next_link()
        );
    },

    previous_link: function() {
        if (this.props.current > 0) {
            return React.createElement(IndexLink, {to: "/" + (this.props.current - 1)}, "Previous");
        } else {
            return React.createElement("span", null, "Previous");
        }

    },

    next_link: function() {
        if (this.props.current < this.props.last) {
            return React.createElement(IndexLink, {to: "/" + (this.props.current + 1)}, "Next");
        } else {
            return React.createElement("span", null, "Next");
        }
    },

    page_links: function() {
        // init an array with one element for each page
        var a = Array.apply(0, Array(this.props.last + 1));

        return a.map(function(x,i) {
            if (i !== this.props.current) {
                return React.createElement(IndexLink, {to: "/" + i, key: i}, i);
            } else {
                return React.createElement("span", {key: i}, i);
            }
        }.bind(this));

    }
});

module.exports = Pagination;
