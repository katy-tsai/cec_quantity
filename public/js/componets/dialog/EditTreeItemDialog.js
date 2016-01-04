const React = require('react');
const ReactDOM = require('react-dom');
const Dialog = require("./Dialog");
const ajaxApi = require('../../util/ajaxApi');

var EditTreeltemDialog = React.createClass({
  render(){
    return (
      <Dialog title="test" closeDialog={this.props.closeDialog} width="95%" height ="95%" marginTop="10px">

        <div className="editItem_div">
          <ul>
             test
          </ul>
        </div>
        <div className = "footer_btn">
          <button className="button raised bg-blue-500 color-white okBtn" onClick={this._handleCloseDialog}>確認</button>
        </div>
      </Dialog>
    )
  },
  _handleCloseDialog(){

  },
});

module.exports = EditTreeltemDialog;
