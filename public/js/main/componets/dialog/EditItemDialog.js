const React = require('react');
const ReactDOM = require('react-dom');
const Dialog = require("./Dialog");
const Editltem = require('./EditItemDialog.item');

var EditltemDialog = React.createClass({
  getInitialState: function() {
   return {
     editItemsTree: this.props.editItemsTree||[],
     project:this.props.project
   };
 },

  render(){
    var editItemsTree = this.state.editItemsTree;
    var rootItems = editItemsTree._root.children;
    var editItems = rootItems.map(function(obj,i){
      return <Editltem item={obj.data} index={i} key={"edititem_"+i} deletItem={this._handleDeletItem}  editChange={this._handleEditChange}/>
    }.bind(this));
    return (
      <Dialog title="項目編輯" closeDialog={this.props.closeDialog}>
        <div className="editItem_div">
          <div className="toolbarOption">
            <div data-role="btn" className="ripple circle" onClick={this._handleAddItem} ><i className="icon-add-box color-green-500 "></i>新增</div>
          </div>

          <ul>
            {editItems}
          </ul>
        </div>
        <div className = "footer_btn">
          <button className="button raised bg-blue-500 color-white okBtn" onClick={this._handleCloseDialog}>確認</button>
        </div>
      </Dialog>
    )
  },
  _handleCloseDialog:function(){
    var editItemsTree = this.state.editItemsTree;
    var project = this.state.project;
    var treeItems = [];
     editItemsTree.traverseBFOrder(function(node){
       treeItems.push(node.data);
     });
    this.props.saveItems(treeItems,project.id);
    this.props.closeDialog();
  },

  _handleDeletItem:function(index,e){
    var editItemsTree = this.state.editItemsTree;;
    var deleteNote = editItemsTree._root.children[index];
    editItemsTree.remove(deleteNote.data.item,"project",editItemsTree.traverseDF,"item");
    this.setState({editItemsTree:editItemsTree});
  },
  _handleEditChange:function(index,e){
    var editItemsTree = this.state.editItemsTree;
    var value = e.target.value;
    editItemsTree._root.children[index].data.item = value;
    this.setState({editItemsTree:editItemsTree});
  },
  _handleAddItem:function(){
    var editItemsTree = this.state.editItemsTree;
    var project = this.state.project;
    var length = editItemsTree._root.children.length;
    var newAddItem = {item:"",hasChild:"N",type:"root",order:length,ProjectId:project.id};
    editItemsTree.add(newAddItem,"project",editItemsTree.traverseDF,"item");
    console.log(editItemsTree)
    this.setState({editItemsTree:editItemsTree});
  }
});

module.exports = EditltemDialog;
