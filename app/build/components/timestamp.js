var React = require('react');


var Timestamp = React.createClass({displayName: "Timestamp",
    propTypes: {
        time: React.PropTypes.number.isRequired,
        relative: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {relative: true};
    },

    render: function() {
        var timestamp;

        if (this.props.relative) {
            timestamp = relative_timestamp(this.props.time);
        }

        return React.createElement("span", null, timestamp);
    }
})

// based on http://stackoverflow.com/a/6109105
var relative_timestamp = function(seconds) {
    var sPerMinute = 60;
    var sPerHour = sPerMinute * 60;
    var sPerDay = sPerHour * 24;
    var sPerMonth = sPerDay * 30;
    var sPerYear = sPerDay * 365;

    var elapsed = (Date.now()/1000) - seconds;

    var n, unit, plural;

    if (elapsed < sPerMinute) {
        n = Math.round(elapsed)
        unit = 'second';
    } else if (elapsed < sPerHour) {
        n = Math.round(elapsed/sPerMinute)
        unit = 'minute';
    } else if (elapsed < sPerDay ) {
        n = Math.round(elapsed/sPerHour )
        unit = 'hour';
    } else if (elapsed < sPerMonth) {
        n = Math.round(elapsed/sPerDay)
        unit = 'day';
    } else if (elapsed < sPerYear) {
        n = Math.round(elapsed/sPerMonth)
        unit = 'month';
    } else {
        n = Math.round(elapsed/sPerYear )
        unit = 'year';
    }

    if (n > 1) {
        plural = 's';
    } else {
        plural = '';
    }

    return n + ' ' + unit + plural + ' ago';
}

module.exports = Timestamp;
