const React = require('react');
var GridRow = React.createClass({

 render(){
   const node = this.props.node;
   const data = this.props.node.data;
   const isOpen = this.props.node.isOpen;
   const itemName = this.props.itemName;
   const columnWidth = this.props.columnWidth;
   const treeViewWidth = this.props.treeViewWidth;
   const rowClass= data.type+"-row";
   const iconClass = isOpen?"show-btn tree-open" :"show-btn tree-close";
   const childs = this.props.node.children;
   const itemClass = 'editItem-'+(Number(data.order)+1);
    var width ={width: columnWidth+'%'};
   return (
     <div className={rowClass} style={{width:'100%'}}>
       {
         itemName.map(function(name,index){
           //<span className={childs.length>0?iconClass:"show-btn"}  onClick={this.props.isOpen}>{data[name]}</span>
           // <button className=" bg-blue-500 color-white" id="edit-button"  title="編輯" onClick={this.props.openEdit.bind(null,node)} ><i className="icon-mode-edit" ></i></button>

           if(name=='item'){
              var  item_width ={width: treeViewWidth+'%'};
              return (
                <div className="tree-column" key={index} style={item_width}>
                    <button className=" bg-blue-500 color-white" id="edit-button"  title="編輯" onClick={this.props.openEdit.bind(null,node)} ><i className="icon-mode-edit" ></i></button>
                   <span className={childs.length>0?iconClass:"show-btn"}  onClick={this.props.isOpen}><span className={itemClass}></span>{data[name]}</span>
                </div>
              )
           }else{

             return (
               <div className="tree-column" key={index} style={width}>{data[name]?data[name]:""}</div>
             )
           }
         }.bind(this))
       }
     </div>
   );
 }
})

module.exports = GridRow;
