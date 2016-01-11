var React = require('react'),
    ReactDOM = require('react-dom'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    IndexRoute = router.IndexRoute,
    browserHistory = router.browserHistory,
    Index = require('./pages/index.js'),
    Story = require('./pages/story.js');


var App = React.createClass({displayName: "App",
    render: function() {
        return React.createElement("div", null, this.props.children)
    }
});

ReactDOM.render((
    React.createElement(Router, {history: browserHistory}, 
        React.createElement(Route, {path: "/", component: App}, 
            React.createElement(IndexRoute, {component: Index}), 
            React.createElement(Route, {path: "story/:id", component: Story})
        )
    )
), document.getElementById('app'));

module.exports = App;
