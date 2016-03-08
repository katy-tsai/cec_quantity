const React = require('react');
const ReactDOM = require('react-dom');
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var IndexRoute = require('react-router').IndexRoute;
var Master = require('./Master');
var Home =  require('./page/Home');
var AddProject = require('./page/addProject');
// var AllProject = require('./page/allProject');
var EditProject = require('./page/editProject');
var SettingCategories = require('./page/Categories');


// <Route path="/project/all" component={AllProject} />
  <Route path="home" component={Home} />
const AppRoutes = (
  <Route path="/" component={Master}>

    <Route path="/project/add" component={AddProject} />
    <Route path="/project/edit" component={EditProject} />
    <Route path="/setting/categories" component={SettingCategories} />
    <IndexRoute component={AddProject}/>
  </Route>
);

module.exports = AppRoutes;
