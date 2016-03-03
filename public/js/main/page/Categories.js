const React = require('react');
const ReactDOM = require('react-dom');
const ajaxApi = require('../../../util/ajaxApi');
const treeData = require('../../../util/TreeData');
const TreeView = require('../componets/tree/TreeView');
const ListTable = require("../componets/list/ListTable");
const EditCategoriesDialog = require('../componets/dialog/EditCategoriesDialog');
const _ = require('lodash');
var header =[{code:'index',name:'#',style:{width:'3%',textAlign:'center',verticalAlign:'middle'}},
            {code:'code',name:'項目編號',style:{width:'20%',textAlign:'center',verticalAlign:'middle'}},
            {code:'item',name:'項目名稱',style:{width:'45%',verticalAlign:'middle'}},
            {code:'unit',name:'單位',style:{width:'12%',textAlign:'center',verticalAlign:'middle'}},
            {code:'contractPrice',name:'單價',style:{width:'12%',textAlign:'center',verticalAlign:'middle'}},
            {code:'edit',name:'編輯',style:{width:'8%',textAlign:'center',verticalAlign:'middle'}}]

var Categories = React.createClass({
  getInitialState: function() {
   return {
     isShowAddBtn:false,
     categories:[],
     categoriesDetail:[],
     dataTree:null,
     isShowDialog:false,
     selectNode:{},
     type:'WorkItem',
     targetData:{},
     targetIndex:""
   };
 },
 componentDidMount: function() {
   var type = this.state.type;
   ajaxApi.categoriesDao("getBycType",{cType:type},function(items){
      var dataTree = treeData.initWithParentCode(items,'code');
      this.setState({categories:items,dataTree:dataTree});
   }.bind(this));
 },

  render(){
    var categories = this.state.categories;
    var dataTree = this.state.dataTree;
    var editNode = this.state.editNode;
    var type = this.state.type;
    if(!dataTree){
      dataTree = treeData.initWithParentCode(categories,'code');
    }
    var categoriesDetail = this.state.categoriesDetail;
    var addCategoriesBtn = this.state.isShowAddBtn?<div className="addCategories" onClick={this._handleAddCategories}><i className=" icon-add-circle-outline"></i>新增</div>:<div className="addCategories">請選擇工項分類</div>
    var title = (type=='WorkItem')?'編輯工項單價':'編輯工料單價';
    var targetData = this.state.targetData;
    var showEditCategoriesDialog = this.state.isShowDialog?
          <EditCategoriesDialog treeData={treeData} title={title} setData={this._handleSetData}  targetData={targetData} closeDialog={this._handleCloseEditDialog} selectNode={this.state.selectNode} type="MaterialItem"/>:'';

    var WorkItemTabCss =( type=='WorkItem')?'ripple active':'ripple';
    var MaterialItemTabCss = ( type=='MaterialItem')?'ripple active':'ripple';
    return (
      <div className="seetingContent">
         <div className="tabs">
            <label className={WorkItemTabCss} onClick={this._handleTabClick.bind(this,'WorkItem')}>工項</label>
            <label className={MaterialItemTabCss} onClick={this._handleTabClick.bind(this,'MaterialItem')}>工料</label>
         </div>
          <div className="leftTreeView">
            <h1 className="view_title">工項分類</h1>
            <TreeView dataTree={dataTree} paddingLeft={10} isShowMenu={true} selectNodeView={this._handleSelectNodeView} setTree={this._handleSetTree}/>
          </div>
          <div className="topView">
            <h1 className="view_title">單價分析</h1>
            <ListTable datas={categoriesDetail} header={header}  isRanderPagger='false' editClick={this._handleEditClick} />
          </div>
          {showEditCategoriesDialog}
      </div>
    )
  },
  _handleSetData(data){
    var categoriesDetail = this.state.categoriesDetail;
    var index = this.state.targetIndex;
    ajaxApi.categoriesDetaileDao('WorkItem','createOrUpdate',data,function(result){
      categoriesDetail[index]=result;
      this.setState({categoriesDetail:categoriesDetail});
    }.bind(this))

  },
  _handleTabClick(type){
    ajaxApi.categoriesDao("getBycType",{cType:type},function(items){
       var dataTree = treeData.initWithParentCode(items,'code');
       this.setState({categories:items,dataTree:dataTree,type:type,categoriesDetail:[]});
    }.bind(this));
  },
  _handleAddCategories(){
    this.setState({isShowDialog:true});
  },
  openDialog(){
      this.setState({isShowDialog:true});
  },
  _handleCloseEditDialog(){
    this.setState({isShowDialog:false});
  },
  _handleSetTree(tree){
    this.setState({dataTree:tree});
  },
  _handleSelectNodeView(node){
    var code = node.data.code;
    var type = this.state.type;
    ajaxApi.categoriesDetaileDao(type,"getByCategoriesCode",{code:code},function(items){
       this.setState({categoriesDetail:items,isShowAddBtn:true,selectNode:node});
    }.bind(this));
  },
  _handleEditClick(index){
    var categoriesDetail = this.state.categoriesDetail;
    var targetData = categoriesDetail[index];
    console.log('targetData=',targetData)
    this.setState({isShowDialog:true,targetData:targetData,targetIndex:index});
  }
});

module.exports = Categories;
