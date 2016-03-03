const React = require('react');
const ReactDOM = require('react-dom');
const Login = require('./index/Login');

require('../css/index');
ReactDOM.render(
  <div>
    <Login />
  </div>
  ,document.getElementById('app')
);
