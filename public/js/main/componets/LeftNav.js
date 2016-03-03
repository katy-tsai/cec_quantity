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
		<li ripple><Link to="/project/add"><i className="icon-note-add "></i>工程專案</Link></li>
    <li ripple><Link to="/project/edit"><i className="icon-create"></i>工項編輯</Link></li>
    <li ripple><Link to="/project/all"><i className="icon-drive-form"></i>合約填報</Link></li>
    <li ripple><Link to="/project/all"><i className="icon-assignment"></i>執行填報</Link></li>
		<li ripple><Link to="/project/edit"><i className="icon-subject"></i>分析評估</Link></li>
    <li className="divider"></li>
    <h2 className="subheading">系統維護</h2>
    <li ripple><Link to="/setting/workItem"><i className="icon-format-list-bullet"></i>工項編碼維護</Link></li>
    <li ripple><Link to="/setting/material"><i className="icon-format-paint"></i>工料編碼維護</Link></li>
    <li ripple><Link to="/setting/categories"><i className="icon-settings"></i>單價分析維護</Link></li>
		<li className="divider"></li>
		<li ripple><Link to="/home"><i className="icon-check-circle-outline"></i>home</Link></li>

	</ul>
</div>
    )
  }
})

module.exports = LeftNav;
