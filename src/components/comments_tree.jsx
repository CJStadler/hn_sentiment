var React = require('react'),
    d3_tree = require("../lib/d3_tree.js");

var CommentsTree = React.createClass({

    propTypes: {
        root: React.PropTypes.object.isRequired,
        colors: React.PropTypes.func
    },

    componentDidMount: function() {
        var chart = new d3_tree(this.chart_id);
        this.setState({chart: chart});
    },

    componentDidUpdate: function() {
        this.state.chart.render(this.props.root, this.props.colors);
    },

    chart_id: "d3-tree-container",

    render: function() {

        return <div>
            <div id={this.chart_id}></div>
        </div>;
    }

});

module.exports = CommentsTree;
