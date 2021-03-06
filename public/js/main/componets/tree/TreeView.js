const React = require('react');
const ReactDOM = require('react-dom');
const TreeNode = require('./TreeNode');

var TreeView = React.createClass({
  displayName:'TreeView',
  propTypes:{
    tree: React.PropTypes.object
  },
  getInitialState() {

    return  {tree:this.props.dataTree};
  },
  render(){
    var tree = this.props.dataTree;
    var isShowMenu = this.props.isShowMenu||false;
    var paddingLeft = this.props.paddingLeft||5;

    return (
      <div className="treeView">
        <TreeNode tree = {tree} paddingLeft={paddingLeft} isShowMenu={isShowMenu} selectNodeView={this.props.selectNodeView} setTree={this.props.setTree}/>
      </div>
    )
  }



});

module.exports = TreeView;
