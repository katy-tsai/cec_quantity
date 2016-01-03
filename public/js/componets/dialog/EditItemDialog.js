const React = require('react');
const ReactDOM = require('react-dom');
const Dialog = require("./Dialog");
const Editltem = require('./EditItemDialog.item');
var EditltemDialog = React.createClass({
  getInitialState: function() {
   return {
     editProjectItems: this.props.editProjectItems||[]
   };
 },

  render(){
    var editItems = this.state.editProjectItems.map(function(obj,i){
      return <Editltem item={obj} index={i} key={"edititem_"+i} deletItem={this._handleDeletItem}  editChange={this._handleEditChange}/>
    }.bind(this));
    return (
      <Dialog title="項目編輯" closeDialog={this.props.closeDialog}>
        <div className="toolbarOption">
          <div data-role="btn" className="ripple circle"><i className="icon-add-box color-green-500 "></i>新增</div>
          <div data-role="btn" className="ripple circle"><i className=" icon-save color-blue-500 "></i>儲存</div>
        </div>
        <div className="editItem_div">
          <ul>
            {editItems}
          </ul>
        </div>
        <div className = "footer_btn">
          <button className="button raised bg-blue-500 color-white okBtn" onClick={this.props.closeDialog}>確認</button>
        </div>
      </Dialog>
    )
  },
  _handleDeletItem:function(index){
    console.log(index)
  },
  _handleEditChange:function(index){
    console.log(index);
  }
});

module.exports = EditltemDialog;
