const React = require('react');
const ReactDOM = require('react-dom');
const ProjectGrid = require('../grid/ProjectGrid');
var TreeTable = React.createClass({
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
   var editItemsTree = this.props.editItemsTree;
  //  console.log('4.render_grid',editItemsTree)
   return (
     <div>
         <ProjectGrid  project={editProject} editItemsTree={editItemsTree} />
     </div>
   )
 },
  render(){
    var editItemsTree = this.props.editItemsTree;
    // console.log('3.render grid item:',editItemsTree);
    var view = (this.props.editItemsTree.length!=0)?'grid':'blank';
    return this['render_'+view]();
  }
});
module.exports = TreeTable;
