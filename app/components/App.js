// External Lib Imports
let React = require('react');
let ReactRouter = require('react-router-dom');

// Project Imports
let Nav = require('./Nav');
let Home = require('./Home');
let Battle = require('./Battle');
let Popular = require('./Popular');

let Router = ReactRouter.BrowserRouter;
let Route = ReactRouter.Route;
let Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return(
      <Router>
        <div className="container">
          <Nav/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route render={function() {
              return(<p>Not Found</p>)
            }} />
          </Switch>
        </div>
    </Router>
    )
  }
}

module.exports = App;
