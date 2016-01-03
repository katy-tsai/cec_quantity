const React = require('react');
const ReactDOM = require('react-dom');
const ajaxApi = require('../../util/ajaxApi');
const ProjectGrid = require('../ProjectGrid');
var EditTable = React.createClass({
  getInitialState: function() {
   return {
     editPproject:this.props.data,
     editProjectItems:this.props.editProjectItems,
     view:(this.props.editProjectItems.length!=0)?'grid':'blank'
   };
 },

 componentDidMount: function() {

 },
 render_blank(){
   var editPproject = this.state.editPproject;
   return (
     <div className="noteWorkItems">
      <i className="icon-add-circle-outline" style={{fontSize:'30px'}}></i> 請新增{editPproject.projectName}工項
     </div>
   )
 },
 render_grid(){
   var editPproject = this.state.editPproject;
   var editProjectItems = this.state.editProjectItems;
   console.log('render_grid',editProjectItems)
   return (
     <div className="mainContainer card" z="5">
         <ProjectGrid  project={editPproject} ProjectItems={editProjectItems} />
     </div>
   )
 },
  render(){
    var editProjectItems = this.state.editProjectItems;
    var view = this.state.view;
    return this['render_'+view]();
  }
});
module.exports = EditTable;
