const React = require('react');
const ReactDOM = require('react-dom');
const ProjectGrid = require('../grid/ProjectGrid');
const treeData = require('../../../../util/TreeData');
const ajaxApi = require('../../../../util/ajaxApi');
var TreeTable = React.createClass({

 render_blank(){
   var editProject = this.props.editProject;
   return (
     <div className="noteWorkItems">
      <i className="icon-add-circle-outline" style={{fontSize:'30px'}}></i> 請至項目編輯新增{editProject.projectName}工項
     </div>
   )
 },
 render_grid(){
   var editProject = this.props.editProject;
   var editItemsTree = this.props.editItemsTree;
  //  console.log('4.render_grid',editItemsTree)
   return (
     <div>
         <ProjectGrid  project={editProject} editItemsTree={editItemsTree} setEditItemTree={this.props.setEditItemTree}/>
     </div>
   )
 },
  render(){
    console.log("=================3.render tree table")
    var editItemsTree = this.props.editItemsTree;
     console.log('3.render grid item:',editItemsTree);
    if(editItemsTree){
      var view = (editItemsTree._root.children.length!=0)?'grid':'blank';
      return this['render_'+view]();
    }else{
      return this['render_blank']();
    }

  }
});
module.exports = TreeTable;
