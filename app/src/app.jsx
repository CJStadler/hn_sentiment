var React = require('react'),
    ReactDOM = require('react-dom'),
    router = require('react-router'),
    Router = router.Router,
    Route = router.Route,
    IndexRoute = router.IndexRoute,
    browserHistory = router.browserHistory,
    Index = require('./pages/index.js'),
    Story = require('./pages/story.js');


var App = React.createClass({
    render: function() {
        return <div>{this.props.children}</div>
    }
});

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Index} />
            <Route path="story/:id" component={Story} />
        </Route>
    </Router>
), document.getElementById('app'));

module.exports = App;
