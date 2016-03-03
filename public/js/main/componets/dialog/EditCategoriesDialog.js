const React = require('react');
const ReactDOM = require('react-dom');
const Dialog = require("./Dialog");
const ajaxApi = require('../../../../util/ajaxApi');
const TreeView = require('../tree/TreeView');
const ListTable = require("../list/ListTable");
const EditTable = require('../edit/EditTable');
const _ = require('lodash');
var header =[{code:'index',name:'#',style:{width:'3%',textAlign:'center',verticalAlign:'middle'}},
            {code:'code',name:'項目編號',style:{width:'20%',textAlign:'center',verticalAlign:'middle'}},
            {code:'item',name:'項目名稱',style:{width:'45%',verticalAlign:'middle'}},
            {code:'unit',name:'單位',style:{width:'16%',textAlign:'center',verticalAlign:'middle'}},
            {code:'contractPrice',name:'單價',style:{width:'16%',textAlign:'center',verticalAlign:'middle'}}]

var tableData =[{code:'btn',name:'',style:{width:'3%',textAlign:'center',verticalAlign:'middle'}},
            {code:'code',name:'項目編號',style:{width:'20%',textAlign:'center',verticalAlign:'middle'}},
            {code:'item',name:'項目名稱',style:{width:'30%',verticalAlign:'middle'}},
            {code:'unit',name:'單位',style:{width:'13%',textAlign:'center',verticalAlign:'middle'}},
            {code:'contractPrice',name:'單價',style:{width:'13%',textAlign:'center',verticalAlign:'middle'}},
            {code:'firm',name:'施工廠商',style:{width:'21%',textAlign:'center',verticalAlign:'middle'}}]
var EditCategoriesDialog = React.createClass({
  getInitialState: function() {

   return {
     categories:[],
     categoriesDetail:[],
     dataTree2:{},
     selectNode:this.props.selectNode,
     targetData:this.props.targetData,
     tableTree:{}
   };
 },
 componentDidMount: function() {
   var WorkItemId =this.props.targetData.id;
   var treeData = this.props.treeData;
   ajaxApi.categoriesDetaileDao('WorkItemMapping','getAllByWorkItemId',{WorkItemId:WorkItemId},function(datas){
     console.log('datas=',datas)
     var tableTree ;
     tableTree = treeData.init(datas);
     this.setState({tableTree:tableTree});
   }.bind(this))
   var type = this.props.type;
   ajaxApi.categoriesDao("getBycType",{cType:type},function(items){
      var dataTree2 = treeData.initWithParentCode(items,'code');
        console.log("dataTree2=",dataTree2)
      this.setState({categories:items,dataTree2:dataTree2});
   }.bind(this));
 },
  render(){
    var tableTree = this.state.tableTree;
    var dataTree2 = this.state.dataTree2;
    var selectNode= this.props.selectNode;
    var categoriesDetail = this.state.categoriesDetail;
    var targetData = this.props.targetData;
    var setData = this.props.setData;
    var treeData = this.props.treeData;
    console.log('editCategories tableTree=',tableTree)
    return (
      <Dialog title={this.props.title} closeDialog={this.props.closeDialog} width="98%" height ="900px" marginTop="3px">

        <div className="editItem_div">
          <div className="top-categories-edit">
            {selectNode.parent.data.item}>{selectNode.data.item}
            <div className="editCategories-table">
              <EditTable treeData={treeData} tableData={tableData} targetData={targetData} tableTree={tableTree} setData={setData} removeItem={this._handleRemoveItem} setTabletree={this._handleSetTableTree} saveWorkmapping={this._handleSaveWorkMapping}/>
            </div>
          </div>
          <div className="bottem-categories">
            <div className="categoris-tree-view">
              <TreeView dataTree={dataTree2} paddingLeft={10} isShowMenu={true} selectNodeView={this._handleSelectNodeView} setTree={this._handleSetTree}/>
            </div>
            <div className="categoris-listTable">
              <ListTable datas={categoriesDetail} header={header}  isRanderPagger='false'  />
             </div>
          </div>

        </div>
        <div className = "footer_btn">
          <button className="button raised bg-blue-500 color-white okBtn" onClick={this._handleCloseDialog}>確認</button>
        </div>
      </Dialog>
    )
  },

  _handleSetTree(tree){
      this.setState({dataTree2:tree});
  },
  _handleSetTableTree(tableTree){
    this.setState({tableTree,tableTree})
  },
  _handleSaveWorkMapping(workMapping,index){
    console.log('save index=',index)
    var tableTree = this.state.tableTree;
    console.log('workMapping=',workMapping)
    var parent_index = null;
    var sub_index;
    if(workMapping){
      if(workMapping.type=='node'){
        var indexs = index.split('-');
        parent_index = Number(indexs[0])-1;
        sub_index = Number(indexs[1])-1;
      }else{
        sub_index = Number(index)-1;
      }
      ajaxApi.categoriesDetaileDao('WorkItemMapping','createOrUpdate',workMapping,function(data){
        console.log("save data= ",data)
       if(workMapping.type=='node'){
         tableTree._root.children[parent_index].children[sub_index].data=data;
       }else{
         tableTree._root.children[sub_index].data=data;
       }
        this.calculatePric(tableTree,parent_index);
        this.setState({tableTree,tableTree});
      }.bind(this));
    }else{
      var treeData = this.props.treeData;
      var WorkItemId =this.props.targetData.id;
      ajaxApi.categoriesDetaileDao('WorkItemMapping','getAllByWorkItemId',{WorkItemId:WorkItemId},function(datas){
        console.log("datas=",datas)
        var tree  = treeData.init(datas);
        console.log('tree=',tree)
        this.setState({tableTree:tree});
      }.bind(this))
    }

  },
  calculatePric(tableTree,parent_index){
    var treeItems=[];
    tableTree.traverseBFOrder(function(node){
      treeItems.push(node.data);
    })
    console.log("calculatePric tableTree=",tableTree)
    // var treeData = this.props.treeData;
    console.log("calculatePric parent_index=",parent_index)
    if(parent_index!=null){
      var parentNode = tableTree._root.children[parent_index];
      console.log("calculatePric parent=",tableTree._root.children[parent_index]);
      ajaxApi.categoriesDetaileDao('WorkItemMapping','createOrUpdate',parentNode.data,function(data){}.bind(this));
    }

    var targetData = this.props.targetData;
    var treeData = this.props.treeData;
    var price = treeData.calculate(tableTree._root.children,'contractPrice');
    targetData.contractPrice=price;
    this.props.setData(targetData);
  },
  _handleRemoveItem(obj,e){
    var index = obj.index;
    var type = obj.type;
    var tableTree = this.state.tableTree;
    var nodes = tableTree._root.children;
    var changeData;
    var ids =[];
    var parent_index=null;
    var sub_index;
    if(obj.type=='node'){
      var indexs = index.split('-');
      parent_index = Number(indexs[0])-1;
      sub_index = Number(indexs[1])-1;
      changeData = nodes[parent_index].children[sub_index].data;
      ids.push(changeData.id);
      nodes[parent_index].children.splice(sub_index,1);
      ajaxApi.categoriesDetaileDao('WorkItemMapping','bulckDelete',{ids:ids},function(result){});
      this.calculatePric(tableTree,parent_index);
      this.setState({tableTree,tableTree});
    }else{
      sub_index = Number(index)-1;
      changeData = nodes[sub_index].data;
      if(nodes[sub_index].children.length>0){
        if(confirm("項目："+changeData.code+changeData.item+"包含子項目，是否全部刪除?")){
          // console.log(nodes[sub_index].children)
          ids = nodes[sub_index].children.map(function(obj){
            return obj.data.id;
          })
          ids.push(changeData.id);
          nodes.splice(sub_index,1);
          ajaxApi.categoriesDetaileDao('WorkItemMapping','bulckDelete',{ids:ids},function(result){
            this.calculatePric(tableTree,parent_index);
            this.setState({tableTree,tableTree});
          }.bind(this));

        }
      }else{
        ids.push(changeData.id);
        nodes.splice(sub_index,1);
        ajaxApi.categoriesDetaileDao('WorkItemMapping','bulckDelete',{ids:ids},function(result){
          this.calculatePric(tableTree,parent_index);
          this.setState({tableTree,tableTree});
        }.bind(this));
      }
    }
  },


  _handleSelectNodeView(node){
    var code = node.data.code;
    var type = this.props.type;
    ajaxApi.categoriesDetaileDao(type,"getByCategoriesCode",{code:code},function(items){
       this.setState({categoriesDetail:items,isShowAddBtn:true,selectNode:node});
    }.bind(this));
  },
  _handleCloseDialog(){

  },
});

module.exports = EditCategoriesDialog;
