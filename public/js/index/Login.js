const React = require('react');
const ReactDOM = require('react-dom');
const TextField = require('../main/componets/form/TextField');
const Login = React.createClass({
  getInitialState: function() {
   return {
     user:{}
   };
 },
  render(){
    return (
      <div id="login">

        <div id="loginForm">
        <div className="">
          <TextField label = "帳號" id="account" name="account" type="text"
                 onChange={this.filedChange.bind(null,'account')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,1)}
                 onFocus={this._handleOnFocus}  />
          <TextField  label = "密碼" id="password" name="password" type="password"
                  onChange={this.filedChange.bind(null,'password')} onEnterKeyDown={this._handleOnEnterKeyDown.bind(null,2)}
                  onFocus={this._handleOnFocus}  />
          <button onClick={this.handleClick}>登入</button>
        </div>
        </div>

      </div>
    )
  },
  filedChange(fileName,e){

  },
  _handleOnEnterKeyDown(index){

  },
  handleClick(){
    console.log('test');
    window.location.href = "main";
  },
  _handleOnFocus:function(e){

  },
})

module.exports = Login;
