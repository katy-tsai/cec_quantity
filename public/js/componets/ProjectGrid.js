const React = require('react');
const ReactDOM = require('react-dom');
const TreeGrid = require('./grid/TreeGrid');
const treeData = require('../util/TreeData');
const headers = ['項目名稱','單位','發包數量','發包單價','發包複價','發包工率','備註'];
const itemName = ['item','unit','contractNum','contractPrice','contractCheckPrice','contractRate','note'];
const EditTreeltemDialog = require('./dialog/EditTreeItemDialog');
var ProjectGrid = React.createClass({
  getInitialState: function() {
   var projectItems = this.props.editProjectItems;
   const tree = treeData.init(projectItems);
   return {
     project:this.props.project,
     projectItems:projectItems,
     tree:tree,
     editNode:{},
     isShowEditTreeDialog:false
   };
 },
 componentDidMount: function() {

 },
 saveItems:function(item){
   var items = this.props.items;
   uiItems.saveItems(item,function(data){
     items[data.index] = data;
     this.setState({items:items});
     this.props.itemChange(items);
   }.bind(this));
 },

  render(){
    var project = this.props.project;
    var editView = this.state.editView;
    var projectItems = this.props.editProjectItems;
    var editNode = this.state.editNode;
    const tree = treeData.init(projectItems);
    var showEditTreeDialog = this.state.isShowEditTreeDialog?
      <EditTreeltemDialog closeDialog={this._handleCloseEditDialog} editNode={editNode}
       editProjectItems={projectItems} title="選取工料項目" type="node"
          project={project}/>:'';

    return (
      <div>
        <div className="treeGrid-header">{project.projectName}</div>
        <TreeGrid header={headers} itemName={itemName} treeViewWidth={30} tree={tree} openEdit={this.openEdit}/>
        {showEditTreeDialog}
     </div>
    );
  },
  openEdit:function(node){
    this.setState({editNode:node,isShowEditTreeDialog:true});
  },
  _handleCloseEditDialog:function(){
    this.setState({isShowEditTreeDialog:false});
  }


});

module.exports = ProjectGrid;
