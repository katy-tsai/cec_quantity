const React = require('react');
const ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var AppRoutes = require('./app-router');
var Master = require('./page/Master');
var Route = require('react-router').Route;
var Home =  require('./page/Home');
var createHistory = require('history/lib/createHashHistory');
var AppRoutes = require('./app-router');
require('../css/main');


ReactDOM.render(
  <Router history={createHistory({queryKey: false})}>
   {AppRoutes}
 </Router>
  ,document.getElementById('app')
);
