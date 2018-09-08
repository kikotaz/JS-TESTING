var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Binance = require('./Binance');

class App extends React.Component{
  render(){
    return(
      <Router>
        <div className='container'>
         <Nav />
         <Switch>
           <Route exact path='/' component={Home} />
           <Route exact path='/bin' component={Binance} />
         </Switch>
        </div>
      </Router>
    )
  }
}


module.exports = App;
