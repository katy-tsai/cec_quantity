const React = require('react');

var GridHeader = React.createClass({

  render(){
    var headers = this.props.header;
    var columnWidth = this.props.columnWidth;
    var treeViewWidth = this.props.treeViewWidth;
    console.log(this.props.width);
    var divStyle ={
      width:this.props.width+'%'
    }
    return (
      <thead>
      <tr className="treeHeader" style={divStyle}>
        {headers.map(function(header,index){
          var width ={width: columnWidth+'%'};
          if(index==0){
            width ={width: treeViewWidth+'%'};
          }
          return (<th key={'gridth'+index} style={width}>{header}</th>)
      })}
      </tr>
      </thead>
    );
  }
});
module.exports = GridHeader;
