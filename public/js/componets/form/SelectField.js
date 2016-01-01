const React = require('react');
const ReactDOM = require('react-dom');

var SelectField = React.createClass({
  render() {
      const menuItems = this.props.menuItems;
      return (
         <div className = "select-field" >
          <label htmlFor={this.props.id}>{this.props.label}</label>
          <select id={this.props.id} name={this.props.name} onChange={this.props.onChange} className="dropdown-menu">
            {menuItems.map(this.renderNode)}
          </select>
         </div >
      )
    },
    renderNode(item){
    var key = item.code+"_"+item.id;
      return (
        <option value={item.code} key={key} >{item.text}</option>
      )
    }
})

module.exports = SelectField;
