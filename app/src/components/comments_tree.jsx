var React = require('react'),
    clustering = require("../../../lib/clustering.js"),
    d3_tree = require("../../../lib/d3_tree.js");

var CommentsTree = React.createClass({

    propTypes: {
        loaded: React.PropTypes.bool.isRequired,
        root: React.PropTypes.object.isRequired
    },

    componentDidMount: function() {
        var chart = new d3_tree(this.chart_id);
        this.setState({chart: chart});
    },

    componentDidUpdate: function() {
        if (this.props.loaded) {
            this.state.chart.render(this.props.root);
        }
    },

    chart_id: "d3-tree-container",

    render: function() {

        // where should the clustering be done?
        // var clusters = d3_clustering.clusters_from_comments(this.props.flat_comments, this.props.terms, 5);

        // list = clusters.map(function(cluster, i) {
        //     var comments = cluster.map(function(comment_vector) {
        //         return <li dangerouslySetInnerHTML={{__html: comment_vector.comment.text}}} />;
        //     });
        //     return <div>
        //             <h2>{i}</h2>
        //             <ul>{comments}</ul>
        //         </div>;
        // });

        var loading;

        if (! this.props.loaded) {
            loading = "loading...";
        }

        return <div>
            {loading}
            <div id={this.chart_id}></div>
        </div>;
    }

});

module.exports = CommentsTree;
