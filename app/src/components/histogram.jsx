var React = require('react'),
    d3Histogram = require('../libs/d3_histogram.js');

var Histogram = React.createClass({

    componentDidMount: function(node) {
        var hist = d3Histogram.new_chart(this.chart_id(), this.props.values);
        this.setState({chart: hist});
    },

    componentDidUpdate: function() {
        this.state.chart.render(this.props.values);
    },

    chart_id: function() {
        return "histogram-" + this.props.id;
    },

    render: function() {
        return <div id={this.chart_id()}>
        </div>;
    }

});

module.exports = Histogram;
