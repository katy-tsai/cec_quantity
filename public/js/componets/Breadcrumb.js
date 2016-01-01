const React = require('react');
const ReactDOM = require('react-dom');

var Breadcrumb = React.createClass({
  render() {
      return (
         <div className = "breadcrumb">
          <div className ="breadcrumb-header" >{this.props.header}</div>
         </div >
      )
    }
})

module.exports = Breadcrumb;
