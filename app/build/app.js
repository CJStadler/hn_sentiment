var React = require('react'),
    ReactDOM = require('react-dom'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    IndexRoute = router.IndexRoute,
    browserHistory = router.browserHistory,
    IndexLink = router.IndexLink,
    Index = require('./pages/index.js'),
    StoryPage = require('./pages/story_page.js');


var App = React.createClass({displayName: "App",
    render: function() {
        return React.createElement("div", null, 
            React.createElement("div", null, React.createElement(IndexLink, {to: "/"}, "Index")), 
            this.props.children
        );
    }
});

ReactDOM.render((
    React.createElement(Router, {history: browserHistory}, 
        React.createElement(Route, {path: "/(:page)", component: App}, 
            React.createElement(IndexRoute, {component: Index}), 
            React.createElement(Route, {path: "/story/:id", component: StoryPage})
        )
    )
), document.getElementById('app'));

module.exports = App;
