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
      <div className="treeHeader" style={divStyle}>
        {headers.map(function(header,index){
          var width ={width: columnWidth+'%'};
          if(index==0){
            width ={width: treeViewWidth+'%'};
          }
          return (<div className={header} key={index} style={width}>{header}</div>)
      })}
      </div>
    );
  }
});
module.exports = GridHeader;
