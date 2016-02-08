var React = require('react'),
    d3_clustering = require("../../../lib/d3_clustering.js");

var Clustering = React.createClass({

    propTypes: {
        comments: React.PropTypes.array,
        terms: React.PropTypes.array
    },

    // componentDidMount: function(node) {
    //     var hist = d3Histogram.new_chart(this.chart_id(), this.props.values);
    //     this.setState({chart: hist});
    // },

    render: function() {
        var list;
        if (this.props.terms && this.props.comments) {
            var clusters = d3_clustering.clusters_from_comments(this.props.comments, this.props.terms, 5);
            list = clusters.map(function(cluster, i) {
                var comments = cluster.map(function(comment_vector) {
                    return <li dangerouslySetInnerHTML={{__html: comment_vector.comment.text}}} />;
                });
                return <div>
                        <h2>{i}</h2>
                        <ul>{comments}</ul>
                    </div>;
            });
        }
        return <div id="clustering">{list}</div>;
    }

});

module.exports = Clustering;
