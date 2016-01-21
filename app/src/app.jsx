var React = require('react'),
    ReactDOM = require('react-dom'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    IndexRoute = router.IndexRoute,
    IndexLink = router.IndexLink,
    browserHistory = require('history/lib/createBrowserHistory')(), // change this using react-router 2.0
    Index = require('./pages/index.js'),
    StoryPage = require('./pages/story_page.js');

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
        <Route path="/(:page)" component={App}>
            <IndexRoute component={Index} />
            <Route path="/story/:id" component={StoryPage} />
        </Route>
    </Router>
), document.getElementById('app'));

module.exports = App;
