const React = require('react');
const ReactDOM = require('react-dom');
const TreeGrid = require('./grid/TreeGrid');
const treeData = require('../util/TreeData');
const headers = ['項目名稱','單位','發包數量','發包單價','發包複價','發包工率','備註'];
const itemName = ['item','unit','contractNum','contractPrice','contractCheckPrice','contractRate','note'];
const EditTreeltemDialog = require('./dialog/EditTreeItemDialog');
var ProjectGrid = React.createClass({
  getInitialState: function() {
   var tree = this.props.editItemsTree;
   return {
     project:this.props.project,
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
    var tree = this.props.editItemsTree;
    var editNode = this.state.editNode;
    var showEditTreeDialog = this.state.isShowEditTreeDialog?
      <EditTreeltemDialog closeDialog={this._handleCloseEditDialog} editNode={editNode}
       tree={tree} title="選取工料項目" type="node"
          project={project}/>:'';
    console.log("projectgrid tree:",tree);
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
