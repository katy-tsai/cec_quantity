const React = require('react');
const GridRow = require('./TreeGrid.Row');
const treeData = require('../../../../util/TreeData');
const Tree = require('../../../../util/Tree');
var GridBody = React.createClass({
  getInitialState() {
    var tree = this.props.tree;
    return  {tree:tree};
  },
  renderItems(root,items){
    var trClassName = "node-item-"+root.data.type;
     items.push(
            <tr className={trClassName} key={"row"+root.data.id}>
               {this.renderData(root,root.isOpen)}
            </tr>
     )
     return items;
  },

  renderRow(roots){
    var items = [];
    console.log('treeGrid root=',roots)
    roots.map(function(root){
       items = this.renderItems(root,items);
       if(root.children.length>0){
         if(root.isOpen){
           root.children.map(function(node){
              items = this.renderItems(node,items);
              if(node.children.length>0){
                if(node.isOpen){
                  node.children.map(function(leaf){
                    items = this.renderItems(leaf,items);
                    if(leaf.children.length>0){
                      if(leaf.isOpen){
                        leaf.children.map(function(leaf1){
                            items = this.renderItems(leaf1,items);
                        }.bind(this))
                      }
                    }
                  }.bind(this))
                }
              }
           }.bind(this))
         }
       }


    }.bind(this))

  return items;
  },
  renderData(root,isOpen){
    var data = root.data;
    var headers = this.props.header;
    return  headers.map(function(obj,i){
      var attr = obj.code;
      var style = obj.style;
      var tree_icon=<div className="tree_click"></div>;
      var index = Number(data.order)+1;
      var itemClass ='item-'+data.type+'-'+index;
      if(root.children.length>0){
        tree_icon = isOpen?<div className="tree_click tree_open_img" onClick={this._handleClick.bind(null,data.id)}></div>:<div className="tree_click tree_close_img" onClick={this._handleClick.bind(null,data.id)}></div>;
      }
      if(attr=='edit-icon'){
        if(data.type=='root'){
            return (<td key={data.id+attr+i} className={attr} style={style} onClick={this.props.openEdit.bind(null,root)}><i className="icon-add-circle" ></i></td>)
        }else if(data.type=='leaf1'){
           return (<td key={data.id+attr+i} className={attr} style={style} ></td>)
        }else{
          return (<td key={data.id+attr+i} className={attr} style={style} >+</td>)
        }

      }else if(attr=='item'){
        return (
          <td key={data.id+attr+i} style={style} className={data.type}>{tree_icon}<div className={itemClass}>{data[attr]}</div></td>
        )
      }else if(attr=='icon-function'){
        return (
          <td key={data.id+attr+i} style={style}></td>
        )
      }else{
        return (
          <td key={data.id+attr+i} style={style}>{data[attr]}</td>
        )
      }

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
