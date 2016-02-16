var React = require('react'),
    d3_tree = require("../../../lib/d3_tree.js");

var CommentsTree = React.createClass({displayName: "CommentsTree",

    propTypes: {
        loaded: React.PropTypes.bool.isRequired,
        root: React.PropTypes.object.isRequired,
        colors: React.PropTypes.func
    },

    componentDidMount: function() {
        var chart = new d3_tree(this.chart_id);
        this.setState({chart: chart});
    },

    componentDidUpdate: function() {
        if (this.props.loaded) {
            this.state.chart.render(this.props.root, this.props.colors);
        }
    },

    chart_id: "d3-tree-container",

    render: function() {

        var loading;

        if (! this.props.loaded) {
            loading = "Loading...";
        }

        return React.createElement("div", null, 
            loading, 
            React.createElement("div", {id: this.chart_id})
        );
    }

});

module.exports = CommentsTree;
