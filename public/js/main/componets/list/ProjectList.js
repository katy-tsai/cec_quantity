const React = require('react');
const ReactDOM = require('react-dom');

const ListView = require('./ListView');
const SelectList = require('./SelectList');

var ProjectList = React.createClass({

  render(){
    var lists = this.props.lists;
    return (
      <div>
        <SelectList selectClick={this._handleSelect} selectChange={this._handleSelect} value={this.props.value}/>
        <ListView lists={lists} onClick={this._handleClick} selectIndex = {this.props.selectIndex}/>
      </div>
    )
  },
  _handleClick:function(index,e){
    var projects = this.props.lists;
    var chooseProject = projects[index];
    this.props.setProject(chooseProject,index);
  },
  _handleSelect:function(e){
    var query = e.target.value;
    this.props.setQuery(query);
  }
})

module.exports = ProjectList;
