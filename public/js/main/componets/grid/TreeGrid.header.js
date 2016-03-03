const React = require('react');

var GridHeader = React.createClass({

  render(){
    var headers = this.props.header;
    return (
      <thead>
      <tr className="treeHeader">
        {headers.map(function(obj,index){
          return (<th key={'gridth'+index} style={obj.style}>{obj.name}</th>)
      })}
      </tr>
      </thead>
    );
  }
});
module.exports = GridHeader;
