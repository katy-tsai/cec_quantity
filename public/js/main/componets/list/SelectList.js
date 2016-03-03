const React = require('react');
const ReactDOM = require('react-dom');

var SelectList = React.createClass({
  render(){
    return (
      <div  className="selectList">
         <input type="text" className="selectInput" onChange={this.props.selectClick} value={this.props.value}/>
         <span className="searchIcon"><i className="icon-search"></i></span>
      </div>
    )
  }
});
module.exports = SelectList;
