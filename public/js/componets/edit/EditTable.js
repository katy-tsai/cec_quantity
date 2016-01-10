const React = require('react');
const ReactDOM = require('react-dom');
const ajaxApi = require('../../util/ajaxApi');
const ProjectGrid = require('../ProjectGrid');
var EditTable = React.createClass({
 render_blank(){
   var editProject = this.props.editProject;
   return (
     <div className="noteWorkItems">
      <i className="icon-add-circle-outline" style={{fontSize:'30px'}}></i> 請新增{editProject.projectName}工項
     </div>
   )
 },
 render_grid(){
   var editProject = this.props.editProject;
   var editProjectItems = this.props.editProjectItems;
  //  console.log('4.render_grid',editProjectItems)
   return (
     <div>
         <ProjectGrid  project={editProject} editProjectItems={editProjectItems} />
     </div>
   )
 },
  render(){
    var editProjectItems = this.props.editProjectItems;
    // console.log('3.render grid item:',editProjectItems);
    var view = (this.props.editProjectItems.length!=0)?'grid':'blank';
    return this['render_'+view]();
  }
});
module.exports = EditTable;
