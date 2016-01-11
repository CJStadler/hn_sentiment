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


var App = React.createClass({
    render: function() {
        return <div>
            <div><IndexLink to="/">Index</IndexLink></div>
            {this.props.children}
        </div>
    }
});

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="story/:id" component={StoryPage} />
        </Route>
    </Router>
), document.getElementById('app'));

module.exports = App;
