const React = require('react');
const ReactDOM = require('react-dom');
const ajaxApi = require('../util/ajaxApi');
var ProjectList = React.createClass({
  getInitialState: function() {
   return {
     projects:[]
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
      
      </div>
    )
  }
})

module.exports = ProjectList;
