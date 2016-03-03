const React = require('react');
const ReactDOM = require('react-dom');

const ajaxApi = require('../../../../util/ajaxApi');
const  EditSecondTable = require('./EditSecondTable');

var EditTable = React.createClass({

 render_body(item,targetData,attrs){
    var tableTree = this.props.tableTree;
    var setData = this.props.setData;
    var obj_props = attrs.map(function(attr,i){
      var style = attr.style;
      var value = attr.code=="btn"?'':targetData[attr.code];
      var spanClass = attr.code;
      var index_key = item+"_td_"+i;
      if(attr.code=="firm"){
        return(
          <td key={index_key} style={style}>
            <select id="firm">
              <option value="01">abc廠商</option>
            </select>
          </td>
        )
      }else if(attr.code=='btn'){
        return(
          <td key={index_key} style={style} className=" edit-icon" title='新增細項' onClick={this._handleAddItem.bind(null,{type:'root',parent:''})}>
            <i className=" icon-add"></i>
          </td>
        )
      }else if(attr.code=='contractPrice'){
        if(tableTree._root){
           var nodes = tableTree._root.children;
          if(nodes.length>0){
            // value = treeData.calculate(nodes,'contractPrice');
            return (
              <td key={index_key} style={style}>
                    <span className={spanClass}>{value}</span>
              </td>
            )
          }
        }
        return (
          <td key={index_key} style={style}>
              <input type='text' value={value} />
          </td>
        )

      }else{
        return <td key={index_key} style={style}><span className={spanClass}>{value}</span></td>;
      }


    }.bind(this))
    return (
      <tr key={item+"_tr"} >
        {obj_props}
      </tr>
    )
 },
  render(){
    console.log("==========render editTable============")
    console.log(this.props.tableTree)
     var targetData = this.props.targetData;
     var tableTree = this.props.tableTree;
     var nodes =[];
     if(tableTree._root){
         nodes = tableTree._root.children;
     }
     console.log('render editTable nodes=s',nodes)

      var header = this.props.tableData.map(function(obj,i){
        var style = obj.style;
        return (
          <th key={"th_"+i} code={obj.code} style={style}>{obj.name}</th>
        )
      });

    var cumNumber =   header.length;
    return (
      <div>
        <table className="edit-table">
          <thead>
            <tr>
              {header}
            </tr>
          </thead>
          <tbody>
            {this.render_body('workItem',this.props.targetData,this.props.tableData)}
            <tr>
              <td colSpan={cumNumber}>
                <EditSecondTable nodes={nodes} removeItem={this.props.removeItem} addItem={this._handleAddItem} attrOnChange={this._handleAttrChange} codeOnBlur={this._handleCodeBlur} priceOnBlur={this._handlePriceBlur}/>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    )
  },
  _handlePriceBlur:function(obj,e){
     var index = obj.index;
    var targetData = this.props.targetData;
    var tableTree = this.props.tableTree;
    var nodes = tableTree._root.children;
    var price = e.target.value;
    var changeData ;
    if(obj.type=='node'){
      var indexs = index.split('-');
      var parent_index = Number(indexs[0])-1;
      var sub_index = Number(indexs[1])-1;
      changeData = nodes[parent_index].children[sub_index].data;

    }else{
      var sub_index = Number(index)-1;
      changeData = nodes[sub_index].data;
    }
    if(price){
      changeData.contractPrice=price;
      this.props.saveWorkmapping( changeData,index);
    }
  },
  _handleCodeBlur:function(obj,e){
     var index = obj.index;
     var targetData = this.props.targetData;
     var tableTree = this.props.tableTree;
     var nodes = tableTree._root.children;
     var changeData ;
     if(obj.type=='node'){
       var indexs = index.split('-');
       var parent_index = Number(indexs[0])-1;
       var sub_index = Number(indexs[1])-1;
       changeData = nodes[parent_index].children[sub_index].data;

     }else{
       var sub_index = Number(index)-1;
       changeData = nodes[sub_index].data;
     }
     var code = e.target.value;
     if(code){
       ajaxApi.categoriesDetaileDao('MaterialItem','getByCode',{code:code,state:'Y'},function(result){
         if(result[0]){
           var data = {
             code:code,
             item:result[0].item,
             unit:result[0].unit,
             contractPrice:result[0].contractPrice,
             WorkItemId:targetData.id
           }
           changeData=_.assign(changeData, data);
           this.props.saveWorkmapping(changeData,index);

         }else{
          // nodes[index].data =nodes[index].data.code;
          this.props.saveWorkmapping( null,index);
           alert('無此編號，請重新輸入');
         }

       }.bind(this))
     }
  },


  _handleAttrChange:function(obj,e){
    var index = obj.index;
    var attr = obj.attr;
    var tableTree = this.props.tableTree;
    var nodes = tableTree._root.children;
    var value = e.target.value;
    var changeData;
    console.log(obj.type);
    if(obj.type=='node'){
      var indexs = index.split('-');
      var parent_index = Number(indexs[0])-1;
      var sub_index = Number(indexs[1])-1;
      changeData = nodes[parent_index].children[sub_index].data;

    }else{
      var sub_index = Number(index)-1;
      changeData = nodes[sub_index].data;
    }
    changeData[attr]= value;
    this.props.setTabletree(tableTree);
  },
  _handleAddItem:function(obj,e){
    var parent = obj.parent;
    var type = obj.type;
    console.log("_handleAddItem parent = ",parent)
    console.log("_handleAddItem type = ",type)
    var targetData = this.props.targetData;
    var tableTree = this.props.tableTree;

    var order =0;
    if(tableTree._root){
      order = tableTree._root.children.length;
    }
    var newItem = {
      WorkItemId:targetData.id,
      order:order,
      hasChild:'N',
      type:type,
      parent:parent
    }

    if(type=='node'){
      if(parent){
        tableTree.add(newItem,parent,tableTree.traverseDF,"id");
      }
    }else{
      tableTree.add(newItem,"project",tableTree.traverseDF,"item");
    }

    this.props.setTabletree(tableTree);
  }
});
module.exports = EditTable;
