var React = require('react'),
    ReactDOM = require('react-dom'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    IndexRoute = router.IndexRoute,
    IndexLink = router.IndexLink,
    browserHistory = require('history/lib/createBrowserHistory')(), // change this if using react-router 2.0
    Index = require('./pages/index.jsx'),
    StoryPage = require('./pages/story_page.jsx');

var App = React.createClass({
    render: function() {
        return <div>
            <div><IndexLink to="/">Index</IndexLink></div>
            {this.props.children}
        </div>;
    }
});

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="/story/:id" component={StoryPage} />
        </Route>
    </Router>
), document.getElementById('app'));

module.exports = App;
