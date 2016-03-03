const React = require('react');
const GridRow = require('./TreeGrid.Row');
const data = require('../../../../__test__/data').data;
const treeData = require('../../util/TreeData');
const Tree = require('../../util/Tree');
var GridBody = React.createClass({
  getInitialState() {
    var tree = this.props.tree;
    return  {tree:tree};
  },
  convertItems(root,items){
    items.push({'data':root.data,'isOpen':root.parent.isOpen,'iconOpen':root.isOpen});
    if(root.children.length>0){
      root.children.map(function(node){
        this.convertItems(node,items);
      }.bind(this));
    }
    return items;
  },

  renderRow(root,i){
    var items = [];
    root.map(function(node){
      items =this.convertItems(node,items);
    }.bind(this))
   return items.map(function(root){
     var trClassName = "node-item "+root.data.type;
     if(root.isOpen){
       return (
              <tr className={trClassName} key={"row"+root.data.id}>
                 {this.renderData(root.data,root.iconOpen)}
              </tr>
       )
     }

   }.bind(this))
  },
  renderData(data,isOpen){
    var itemName = this.props.itemName;
    return  itemName.map(function(attr,i){
      var tree_icon = <div className="tree_click"></div>;
      if(data.hasChild=='Y'){
        if(attr=='item'){
          tree_icon = isOpen?<div className="tree_click tree_open_img" onClick={this._handleClick.bind(null,data.id)}></div>:<div className="tree_click tree_close_img" onClick={this._handleClick.bind(null,data.id)}></div>;
        }
      }
      return (
        <td key={data.id+attr+i} className={attr}>{tree_icon}{data[attr]}</td>
      )
    }.bind(this));
  },
  render(){
    var tree = this.props.tree;
    var roots = tree._root.children;
    console.log(tree)
    return (
        <tbody>
          {this.renderRow(roots)}
        </tbody>
    );
  },
  _handleClick(id){
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
