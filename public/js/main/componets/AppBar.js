const React = require('react');
const ReactDOM = require('react-dom');

const AppBar = React.createClass({
  render() {
      return (
         <div className = "toolbar  color-white" id = "toolbarbg" >
          <button className = "icon-button" onClick = {this.handleClickNav}> < i className = "icon-menu" > < /i></button >
          <span className = "toolbar-label" > {this.props.title} </span>
          <span className = "float-right" >
            <button className ="icon-button" > <i className ="icon-search" > </i></button >
            <button className = "icon-button" > <i className = "icon-star" ></i></button >
          </span>
        </div >
      )
    },

    handleClickNav() {
      var sidemenu = document.getElementById('navigation-sidemenu');
      SideMenu.toggle(sidemenu);
    }
})

module.exports = AppBar;
