const React = require('react');
const ReactDOM = require('react-dom');

var ContextMenu = React.createClass({

  render() {
    var menus ="";
    if(this.props.menus){
      menus = this.props.menus.map(function(obj,i){
        var fun = this.props[obj.clickFun];

        return (
          <li onClick={fun} key={"menu_"+i} className="ripple circle"><i className={obj.icon}></i>{obj.name}</li>
        )
      }.bind(this));
    }

      return (
        <ul className="menu" style={this.props.style}>
        	{menus}
        </ul>
      )
    }
})

module.exports = ContextMenu;
