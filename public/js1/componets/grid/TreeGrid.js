const React = require('react');
const GridHeader = require('./TreeGrid.header');
const GridBody = require('./TreeGrid.body');
var TreeGrid = React.createClass({
  displayName:'TreeGrid',
  propTypes:{
    header:React.PropTypes.array.isRequired,
    itemName:React.PropTypes.array.isRequired,
    treeViewWidth:React.PropTypes.number,
    columnWidth:React.PropTypes.number,
    tree: React.PropTypes.object
  },
  getInitialState() {
    return  this.init(this.props);
  },
  getDefaultProps() {
    return {
      treeViewWidth: 30||this.props.treeViewWidth,
      columnWidth:10||this.props.columnWidth
    };
  },
  init(props) {
    var columnNum = this.props.header.length;

    var treeViewWidth = this.props.treeViewWidth;
    var columnWidth = (100-treeViewWidth)/(columnNum-1);
    var width=100;
    return {
      tree:this.props.tree,
      header:this.props.header,
      columnNum:columnNum,
      itemName:this.props.itemName,
      treeViewWidth:this.props.treeViewWidth,
      columnWidth:columnWidth,
      width:width
    };
  },
  render(){
    var header = this.state.header;
    var width = this.state.width;
    var tree = this.props.tree;
    var columnNum = this.state.columnNum;
    var itemName = this.state.itemName;
    var columnWidth = this.state.columnWidth;
    console.log('treeGrid tree',tree);
    return (
      <table id="tree-grid">
        <GridHeader header={header} width={width} treeViewWidth={this.props.treeViewWidth} columnWidth={columnWidth}/>
        <GridBody openEdit={this.props.openEdit} itemName={itemName} tree={tree} width={width} treeViewWidth={this.props.treeViewWidth} columnWidth={columnWidth}/>
     </table>
    );
  }
});
module.exports = TreeGrid;
