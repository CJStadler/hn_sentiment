var React = require('react'),
    d3Histogram = require('../libs/d3_histogram.js');

var Histogram = React.createClass({

    componentDidMount: function(node) {
        var hist = d3Histogram.new_chart(this.chart_id(), this.props.values);
        this.setState({chart: hist});
    },

    shouldComponentUpdate: function(nextProps) {
        return nextProps.values.length !== this.props.values.length;
    },

    componentDidUpdate: function() {
        this.state.chart.render(this.props.values, this.props.click_callback);
    },

    chart_id: function() {
        return "histogram-" + this.props.id;
    },

    render: function() {
        return <div className="histogram" id={this.chart_id()}>
        </div>;
    }

});

module.exports = Histogram;
