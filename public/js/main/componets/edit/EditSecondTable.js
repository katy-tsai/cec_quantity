const React = require('react');
const ReactDOM = require('react-dom');

const nextHeader = [{code:'addbtn',name:'',style:{width:'3%',textAlign:'center',verticalAlign:'middle'}},
            {code:'index',name:'#',style:{width:'7%',textAlign:'center',verticalAlign:'middle'}},
            {code:'code',name:'項目編號',style:{width:'20%',textAlign:'center',verticalAlign:'middle'}},
            {code:'item',name:'項目名稱',style:{width:'30%',verticalAlign:'middle'}},
            {code:'unit',name:'單位',style:{width:'10%',textAlign:'center',verticalAlign:'middle'}},
            {code:'quantity',name:'數量',style:{width:'10%',textAlign:'center',verticalAlign:'middle'}},
            {code:'contractPrice',name:'單價',style:{width:'10%',textAlign:'center',verticalAlign:'middle'}},
            {code:'removebtn',name:'刪除',style:{width:'10%',textAlign:'center',verticalAlign:'middle'}}]


var EditSecondTable = React.createClass({

  render(){
    var nodes = this.props.nodes;
    var header = nextHeader.map(function(obj,i){
      var style = obj.style;
      return (
        <th key={"th_"+i} code={obj.code} style={style}>{obj.name}</th>
      )
    });
    return (
      <table className="next-edit-table">
        <thead>
          <tr>
            {header}
          </tr>
        </thead>
        <tbody>
          {this.renderbody(nodes,false)}
        </tbody>
      </table>
    )
  },
  renderbody(nodes,isSub,superIndex){
    console.log('EditSecondTable nodes = ',nodes)
    var cumNumber =   nextHeader.length;
    var rows=[];
        nodes.map(function(node,index){
         var obj = node.data;
         var obj_props = this.renderTr(node,obj,index,isSub,superIndex);

         rows.push( <tr key={"tr_"+index} >{obj_props}</tr>)
         if(node.children.length>0){

            rows.push( <tr key={"tr_"+index+"_2"}  >
              <td colSpan={cumNumber}>
               {this.renderSubTable(node.children,index+1)}
              </td>
             </tr>)
         }


       }.bind(this));
       console.log(rows)
       return rows;
  },
  renderSubTable(nodes,superIndex){
    var header = nextHeader.map(function(obj,i){
      var style = obj.style;
      if(obj.code!='addbtn'){
        return (
          <th key={"th_"+i} code={obj.code} style={style}>{obj.name}</th>
        )
      }

    });
    return (
      <table className="next1-edit-table">

        <tbody>
          {this.renderbody(nodes,true,superIndex)}
        </tbody>
      </table>
    )

  },
   renderTr(node,obj,index,isSub,superIndex){
     var obj_props = nextHeader.map(function(attr,i){
       var style = attr.style;
       var value ="" ;
       var indexNum =index+1;
       if(isSub){
         indexNum =superIndex+"-"+indexNum;
       }
        value = attr.code=="index"?indexNum:obj[attr.code];
       var spanClass = attr.code;
       var index_key = index+"_td_"+i;
       console.log('parent id=' ,obj.id)
       if(attr.code=='addbtn'){
         if(!isSub){
           if(obj.id){
             return (
                 <td key={index_key}  style={style} className=" edit-icon" title='新增'onClick={this.props.addItem.bind(null,{type:'node',parent:obj.id})}><i className=" icon-add"></i></td>
             )
           }else{
             return (
               <td key={index_key}  style={style} className=" edit-icon"></td>
             )
           }

         }
       }else if(attr.code=='removebtn'){
         return (
             <td key={index_key}  style={style} className=" edit-icon" onClick={this.props.removeItem.bind(null,{index:indexNum,type:obj.type})} ><i className="icon-cancel" ></i></td>
         )
       }else if(attr.code=='code'){
         return (
            <td key={index_key}  style={style} >
              <input type='text' value={value} onBlur={this.props.codeOnBlur.bind(null,{index:indexNum,type:obj.type})} onChange = {this.props.attrOnChange.bind(null,{index:indexNum,attr:'code',type:obj.type})}/>
            </td>
         )
       }else if(attr.code=='contractPrice'){
         var nodes = node.children;
         var treeData = this.props.treeData;
         if(nodes.length>0){
           //value = treeData.calculate(nodes,'contractPrice');
           return (
             <td key={index_key} style={style}>
                   <span className={spanClass}>{value}</span>
             </td>
           )
         }
         return (
           <td key={index_key} style={style}>
               <input type='text' value={value} onBlur={this.props.priceOnBlur.bind(null,{index:indexNum,type:obj.type})} onChange = {this.props.attrOnChange.bind(null,{index:indexNum,attr:'contractPrice',type:obj.type})} />
           </td>
         )

       }else if(attr.code=='quantity'){
          return <td key={index_key} style={style}>1</td>;
       }else{
         if(value){
           return <td key={index_key} style={style}><span className={spanClass}>{value}</span></td>;
         }else{
           return <td key={index_key} style={style}></td>;
         }
       }
     }.bind(this));

     return obj_props;
   }


});
module.exports = EditSecondTable;
