const React = require('react');
const GridRow = require('./TreeGrid.Row');
var GridBody = React.createClass({
  getInitialState() {
    return  {tree:this.props.tree};
  },

  renderRow(root){
    var columnWidth = this.props.columnWidth;
    var treeViewWidth = this.props.treeViewWidth;
    var itemName = this.props.itemName;
    console.log(root.data)
    return (
         <li className="node-item" key={`root${root.data.id}`} >
            <GridRow node={root} itemName={itemName} treeViewWidth={treeViewWidth} openEdit={this.props.openEdit} columnWidth={columnWidth} isOpen={this._handleClick.bind(this,root.data.id)} />
            {this.renderChild(root)}
       </li>
    );
  },
  renderChild(root){
    // var divStyle ={
    //   width:this.props.width+'px'
    // }
      if(root.children.length>0){
        var nodes = root.children;

        if(root.isOpen){
          return (
            <ul className={nodes[0].data.type} >
              { nodes.map(this.renderRow)}
            </ul>
          )
        }
      }
  },
  render(){
    var tree = this.state.tree;
    var roots = tree._root.children;

    // var divStyle ={
    //   width:this.props.width+'px'
    // }
    return (
        <div className="treeBody"  >
           <ul className="root">
             { roots.map(this.renderRow)}
           </ul>
        </div>
    );
  },
  _handleClick(id,e){
     e.preventDefault();
      var tree = this.state.tree;
      var clickNode =null;
      var callback = function(node){
        if(node.data.id === id){
          clickNode =node;
          clickNode.isOpen = (!clickNode.isOpen);
        }
      }
    tree.contains(callback,tree.traverseBF);
    this.setState({
			tree:tree
		});
  }
});
module.exports = GridBody;
