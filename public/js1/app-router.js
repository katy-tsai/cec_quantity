const React = require('react');
const ReactDOM = require('react-dom');
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var Master = require('./page/Master');
var Home =  require('./page/Home');
var AddProject = require('./page/project/addProject');
var AllProject = require('./page/project/allProject');
var EditProject = require('./page/project/editProject');
var SettingCategories = require('./page/setting/Categories');

const AppRoutes = (
  <Route path="/" component={Master}>
    <Route path="home" component={Home} />
    <Route path="/project/add" component={AddProject} />
    <Route path="/project/all" component={AllProject} />
    <Route path="/project/edit" component={EditProject} />
    <Route path="/setting/categories" component={SettingCategories} />
    <IndexRoute component={Home}/>
  </Route>
);

module.exports = AppRoutes;
