const React = require('react');
const ReactDOM = require('react-dom');

var Dialog = React.createClass({
  render(){
    var width = this.props.width||'50%';

    return (
      <div className="divModle" >
          <div className="dialogContent" style={{width:width}}>
            <div className="dialogHeader">
              <span className = "dialogTitle">{this.props.title}</span>
              <span className="closeBtn" data-role="btn" onClick={this.props.closeDialog}><i className="icon-close"></i></span>
            </div>
            <div className="dialogBody">
              {this.props.children}
            </div>
            
          </div>
      </div>
    )
  }
});

module.exports = Dialog;
