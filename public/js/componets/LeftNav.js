const React = require('react');
const ReactDOM = require('react-dom');
var Link = require('react-router').Link;
const LeftNav = React.createClass({
  render(){
    return (

      <div>
	<div className="sidemenu-hero">
		<h1 className="title serif"></h1>
	</div>
	<ul className="menu ">
		<li ripple><i className="icon-info-outline"></i>admin</li>
		<li className="divider"></li>
		<h2 className="subheading">專案</h2>
		<li ripple><Link to="/project/add"><i className="icon-note-add color-red-500"></i>工程專案</Link></li>
    <li ripple><Link to="/project/edit"><i className="icon-subject"></i>工項編輯</Link></li>
    <li ripple><Link to="/project/all"><i className="icon-palette"></i>合約填報</Link></li>
    <li ripple><Link to="/project/all"><i className="icon-palette"></i>執行填報</Link></li>
		<li ripple><Link to="/project/edit"><i className="icon-subject"></i>分析評估</Link></li>
		<li className="divider"></li>
		<li ripple><Link to="/home"><i className="icon-check-circle-outline"></i>home</Link></li>

	</ul>
</div>
    )
  }
})

module.exports = LeftNav;
