const React = require('react');
const ReactDOM = require('react-dom');
const TreeGrid = require('./grid/TreeGrid');
const treeData = require('../util/TreeData');
const headers = ['項目名稱','單位','發包數量','發包單價','發包複價','發包工率','備註'];
const itemName = ['item','unit','contractNum','contractPrice','contractCheckPrice','contractRate','note'];

var ProjectGrid = React.createClass({
  getInitialState: function() {
     //var ProjectItems = this.props.ProjectItems;
    var ProjectItems =[{id: 36, item: "結構", hasChild: "N", order: "0", type: "root"},
    {id: 37, item: "泥作", hasChild: "N", order: "1", type: "root"},
    {id: 38, item: "輕質牆", hasChild: "N", order: "2", type: "root"}]
    const tree = treeData.init(ProjectItems);

   return {
     project:this.props.project,
     ProjectItems:ProjectItems,
     tree:tree,
     editView:'view',
     editNode:{}
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
 render_view(){
  var tree = this.state.tree;
   return (
     <TreeGrid header={headers} itemName={itemName} treeViewWidth={30} tree={tree} openEdit={this.openEdit}/>
   )
 },
 render_root(){
   var editNode = this.state.editNode;
   console.log(editNode);
   return (
     <div>Hello node</div>
   )
 },
  render(){
    var project = this.props.project;
    var editView = this.state.editView;
    return (
      <div>
        <div className="treeGrid-header">{project.projectName}</div>
        {this[ 'render_'+editView]()}
     </div>
    );
  },
  openEdit:function(node){
    var editView = node.data.type;
    this.setState({editView:editView,editNode:node});
  }


});

module.exports = ProjectGrid;
