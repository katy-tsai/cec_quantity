const React = require('react');
const ReactDOM = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const createHistory = require('history/lib/createHashHistory');
const AppRoutes = require('./main/app-router');

require('../css/main');

ReactDOM.render(
  <Router history={createHistory({queryKey: false})}>
   {AppRoutes}
 </Router>
  ,document.getElementById('app')
);
