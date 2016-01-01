const React = require('react');
const ReactDOM = require('react-dom');
const ajaxApi = require('../util/ajaxApi');
const ListView = require('./list/ListView');
const SelectList = require('./list/SelectList');

var ProjectList = React.createClass({
  getInitialState: function() {
   return {
     projects:[],
     query:"",
     selectId:""
   };
 },

  componentDidMount: function() {
    ajaxApi.projectDao('getAll',null,function(data){
      this.setState({projects:data});
    }.bind(this));

  },
  render(){
    var lists = this.state.projects;
    return (
      <div>
        <SelectList selectClick={this._handleSelect} selectChange={this._handleSelectChange}/>
        <ListView lists={lists} onClick={this._handleClick} selectId={this.state.selectId}/>
      </div>
    )
  },
  _handleClick:function(id,e){
    this.setState({selectId:id});
  },
  _handleSelect:function(e){
    var query = e.target.value;
    ajaxApi.projectDao('getLikeNameOrCode',{projectCode:query,projectName:query},function(data){
      this.setState({projects:data});
    }.bind(this));
  },
  _handleSelectChange:function(e){
    var query = e.target.value;
    this.setState({query:query});
  }
})

module.exports = ProjectList;
