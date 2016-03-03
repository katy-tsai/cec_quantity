const React = require('react');
const GridHeader = require('./TreeGrid.header');
const GridBody = require('./TreeGrid.body');
var TreeGrid = React.createClass({
  displayName:'TreeGrid',
  propTypes:{
    header:React.PropTypes.array.isRequired,
    tree: React.PropTypes.object
  },
  getInitialState() {
    return {
      tree:this.props.tree,
      header:this.props.header
    };
  },
  render(){
    var header = this.state.header;
    var tree = this.props.tree;
    console.log('treeGrid tree',tree);
    return (
      <table id="tree-grid">
        <GridHeader header={header}/>
        <GridBody openEdit={this.props.openEdit} header={header} tree={tree} />
     </table>
    );
  }
});
module.exports = TreeGrid;
