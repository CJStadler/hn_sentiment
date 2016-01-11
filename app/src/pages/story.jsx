var React = require('react'),
    IndexLink = require('react-router').IndexLink;

var Story = React.createClass({
    render: function() {
        return <div>
            <IndexLink to="/">Index</IndexLink>
            Hello! {this.props.params.id}
        </div>;
    }
})

module.exports = Story;
