const React = require('react');
const ReactDOM = require('react-dom');

var TreeNode = React.createClass({
  getInitialState() {
    return  {selectid:""};
  },
  render(){
    var roots = this.props.roots;
    return (
      <ul>
          {roots.map(this.renderRoot)}
      </ul>
    )
  },
  renderRoot:function(root){
    var paddingLeft = this.props.paddingLeft;
    var paddingLeft_node = paddingLeft+20;
    var clickDivClass = (root.children.length>0)?((!root.isOpen)?"tree_click tree_open_img":"tree_click tree_close_img"):"tree_click";
    var rendernode = root.children.map(function(node){
      var liclasName = (this.state.selectid==node.data.id)?"tree-row tree-node tree-view-active" :"tree-row tree-node";

      return (
        <li key = {node.data.id} style={{paddingLeft:paddingLeft_node+'px'}} className={liclasName} onClick={this._handleTreeClick.bind(null,node)}>
          <div>
            {node.data.itemCode}   {node.data.item}
          </div>
        </li>
      )
    }.bind(this))
    return (
      <li key = {root.data.id} style={{paddingLeft:paddingLeft+'px'}} className="tree-row" >
        <div>
          <div className={clickDivClass} onClick={this._handleTreeCollapseClick.bind(this,root.data.id)}></div>
          {root.data.itemCode}   {root.data.item}
        </div>
        <ul>
        {(!root.isOpen)?(root.children.length>0)?rendernode:'':''}
        </ul>
      </li>
    )
  },
  _handleTreeClick(node,e){
    e.preventDefault();
    this.setState({selectid:node.data.id})
    this.props.selectNodeView(node);
  },
  _handleTreeCollapseClick(id,e){
    e.preventDefault();
     var tree = this.props.roots;
     tree.map(function(root){
       var nodeId = root.data.id;
       if(nodeId==id){
         root.isOpen =(!root.isOpen);
       }
     })
   this.setState({
     tree:tree
   });
  }


});

module.exports = TreeNode;
