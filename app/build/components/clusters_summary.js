var React = require('react'),
    d3 = require('d3'),
    ColorPatch = require('./color_patch.js');

var ClustersSummary = React.createClass({displayName: "ClustersSummary",

    propTypes: {
        loaded: React.PropTypes.bool.isRequired,
        features: React.PropTypes.array,
        clusters: React.PropTypes.array,
        colors: React.PropTypes.func
    },

    render: function() {

        var clusters = this.props.clusters,
            features = this.props.features,
            cluster_colors = this.props.colors,
            headers, rows;

        if (this.props.loaded) {
            headers = features.map(function(term,i) {
                return React.createElement("th", {key: i}, term);
            });

            rows = clusters.map(function(cluster, cluster_index) {
                var columns = features.map(function(term, feature_index) {
                    return React.createElement("td", {key: feature_index}, term_frequency(feature_index, cluster));
                });

                return React.createElement("tr", {key: cluster_index}, 
                    React.createElement("td", null, React.createElement(ColorPatch, {color: cluster_colors(cluster_index)})), 
                    React.createElement("td", null, cluster.length), 
                    columns
                );
            });
        }

        return React.createElement("table", {className: "clusters-table"}, 
            React.createElement("thead", null, React.createElement("tr", null, 
                React.createElement("th", null), 
                React.createElement("th", null, "# comments"), 
                headers
            )), 
            React.createElement("tbody", null, 
                rows
            )
        )
    }

});

// Calculate the frequency of a term in a cluster
var term_frequency = function(term_index, cluster) {
    return cluster.reduce(function(sum, vector) {
        return sum + vector[term_index];
    }, 0);
};

module.exports = ClustersSummary;
