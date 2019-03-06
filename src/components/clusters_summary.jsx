var React = require('react'),
    d3 = require('d3'),
    ColorPatch = require('./color_patch.jsx'),
    stats = require('../lib/stats.js');

var ClustersSummary = React.createClass({

    propTypes: {
        features: React.PropTypes.array,
        clusters: React.PropTypes.array,
        colors: React.PropTypes.func
    },

    render: function() {

        var clusters = this.props.clusters,
            features = this.props.features,
            cluster_colors = this.props.colors;

        var headers = features.map(function(term,i) {
            return <th key={i}>{term}</th>;
        });

        var rows = clusters.map(function(cluster, cluster_index) {
            var columns = features.map(function(term, feature_index) {
                return <td key={feature_index}>{term_frequency(feature_index, cluster)}</td>;
            });

            var cluster_sentiment = stats.normalized_median(cluster.map(function(c) {
                return c.comment.sentiment;
            }));

            return <tr key={cluster_index}>
                <td><ColorPatch color={cluster_colors(cluster_index)} /></td>
                <td>{cluster.length}</td>
                <td><ColorPatch score={cluster_sentiment} /></td>
                {columns}
            </tr>;
        });

        return <table className="clusters-table">
            <thead><tr>
                <th></th>
                <th># comments</th>
                <th>Sentiment</th>
                {headers}
            </tr></thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    }

});

// Calculate the frequency of a term in a cluster
var term_frequency = function(term_index, cluster) {
    return cluster.reduce(function(sum, vector) {
        return sum + vector[term_index];
    }, 0);
};

module.exports = ClustersSummary;
