const React = require('react');
const ReactDOM = require('react-dom');
const Dialog = require("./Dialog");
const Editltem = require('./EditItemDialog.item');
const ajaxApi = require('../../util/ajaxApi');
var EditltemDialog = React.createClass({
  getInitialState: function() {
   return {
     editProjectItems: this.props.editProjectItems||[],
     project:this.props.project
   };
 },

  render(){
    var editItems = this.state.editProjectItems.map(function(obj,i){
      console.log(obj)
      return <Editltem item={obj} index={i} key={"edititem_"+i} deletItem={this._handleDeletItem}  editChange={this._handleEditChange}/>
    }.bind(this));
    return (
      <Dialog title="項目編輯" closeDialog={this.props.closeDialog}>
        <div className="toolbarOption">
          <div data-role="btn" className="ripple circle" onClick={this._handleAddItem} ><i className="icon-add-box color-green-500 "></i>新增</div>
          <div data-role="btn" className="ripple circle" onClick={this._handleAddItemSave} ><i className="icon-save color-blue-500 "></i>儲存</div>


        </div>
        <div className="editItem_div">
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
    var editProjectItems = this.state.editProjectItems;
    var project = this.state.project;
    ajaxApi.saveItems(editProjectItems,project.id,function(items){
       this.setState({editProjectItems:items});
       this.props.setItems(items);
       this.props.closeDialog();
    }.bind(this));
  },
  _handleAddItemSave:function(){
    var editProjectItems = this.state.editProjectItems;
    var project = this.state.project;
    ajaxApi.saveItems(editProjectItems,project.id,function(items){
      console.log(items);
       this.setState({editProjectItems:items});
       this.props.setItems(items);
    }.bind(this));

  },
  _handleDeletItem:function(index,e){
    var editProjectItems = this.state.editProjectItems;
    var deleteitem = editProjectItems[index];
    editProjectItems.splice(index,1);
    this.setState({editProjectItems:editProjectItems});
    // this.props.setItems(this.state.editProjectItems);
  },
  _handleEditChange:function(index,e){
    var editProjectItems = this.state.editProjectItems;
    var value = e.target.value;
    editProjectItems[index].item = value;
    this.setState({editProjectItems:editProjectItems});
  },
  _handleAddItem:function(){
    var editProjectItems = this.state.editProjectItems;
    var project = this.state.project;
    var length = editProjectItems.length;
    var newAddItem = {item:"",hasChild:"N",type:"root",order:length,ProjectId:project.id};
    this.setState({editProjectItems:editProjectItems.concat(newAddItem)});
  }
});

module.exports = EditltemDialog;
