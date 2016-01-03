const React = require('react');
const ReactDOM = require('react-dom');

var Breadcrumb = React.createClass({

  render() {
    var toolbar ="";
    if(this.props.toolbar){
      toolbar = this.props.toolbar.map(function(obj,i){
        var fun = this.props[obj.clickFun];

        return (
          <div onClick={fun} key={"toolbar_"+i}   className="ripple circle"><i className={obj.icon}></i>{obj.name}</div>
        )
      }.bind(this));
    }

      return (
         <div className = "breadcrumb">
          <div className ="breadcrumb-header" >{this.props.header}</div>
          <div className ="breadcrumb-toolbar">
            {toolbar}

          </div>
         </div >
      )
    }
})

module.exports = Breadcrumb;
